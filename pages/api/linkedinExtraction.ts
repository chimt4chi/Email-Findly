import { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import axios from "axios";

function joinUrl(base: string, relative: string): string {
  const url = new URL(relative, base);
  return url.toString();
}

export async function findLinkedinUrls(url: string): Promise<string[]> {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const linkedinUrls: string[] = [];

      $("a[href]").each((index, element) => {
        const absoluteUrl = joinUrl(url, $(element).attr("href") || "");
        if (absoluteUrl.includes("linkedin.com/company/")) {
          linkedinUrls.push(absoluteUrl);
        }
      });

      return linkedinUrls;
    }
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
  }

  return [];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const linkedinUrls = await findLinkedinUrls(url);
    res.status(200).json({ requestedUrl: url, linkedinUrls });
  } catch (error) {
    console.error(`Error while extracting LinkedIn URLs from ${url}: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
