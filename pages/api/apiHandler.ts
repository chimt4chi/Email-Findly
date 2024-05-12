import { NextApiRequest, NextApiResponse } from "next";
import { findEmailAddresses } from "./emailUtils";
import { findLinkedinUrls } from "./linkedinUtils";

async function handleEmailRequest(startUrls: string[], res: NextApiResponse) {
  try {
    const allEmails: { [url: string]: string[] } = {};

    for (const startUrl of startUrls) {
      const emailAddresses = await findEmailAddresses(startUrl);
      allEmails[startUrl] = emailAddresses;
    }

    res.status(200).json({ emails: allEmails });
  } catch (error) {
    console.error(`Error while processing email request: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleLinkedinRequest(
  startUrls: string[],
  res: NextApiResponse
) {
  try {
    const allLinkedinUrls: { [url: string]: string[] } = {};

    for (const startUrl of startUrls) {
      const linkedinUrls = await findLinkedinUrls(startUrl);
      allLinkedinUrls[startUrl] = linkedinUrls;
    }

    res.status(200).json({ linkedinUrls: allLinkedinUrls });
  } catch (error) {
    console.error(`Error while processing LinkedIn request: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { startingUrls, type } = req.body;

  if (!startingUrls || !Array.isArray(startingUrls) || !type) {
    return res
      .status(400)
      .json({ message: "Starting URLs and type are required" });
  }

  if (type === "email") {
    await handleEmailRequest(startingUrls, res);
  } else if (type === "linkedin") {
    await handleLinkedinRequest(startingUrls, res);
  } else {
    res.status(400).json({ message: "Invalid type specified" });
  }
}
