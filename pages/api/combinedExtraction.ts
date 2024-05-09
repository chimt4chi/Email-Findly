import { NextApiRequest, NextApiResponse } from "next";
import { findEmailAddresses } from "./emailExtraction";
import { findLinkedinUrls } from "./linkedinExtraction";

export default async function combinedExtractionHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url, searchType } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    let emailAddresses: string[] = [];
    let linkedinUrls: string[] = [];

    if (searchType === "email" || searchType === "both") {
      emailAddresses = await findEmailAddresses(url);
    }

    if (searchType === "linkedin" || searchType === "both") {
      linkedinUrls = await findLinkedinUrls(url);
    }

    res.status(200).json({ emailAddresses, linkedinUrls });
  } catch (error) {
    console.error(`Error while extracting data from ${url}: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
