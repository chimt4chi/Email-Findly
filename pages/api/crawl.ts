import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

async function findEmailAddresses(url: string): Promise<string[]> {
  try {
    const response = await axios.get(url);
    const text = response.data;

    // Dummy email regex for demonstration purposes
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emailAddresses = text.match(emailRegex) || [];
    return emailAddresses.filter((email: any) => {
      // Filter out certain email patterns/extensions
      const forbiddenExtensions = [
        ".png",
        ".jpeg",
        ".jpg",
        ".webp",
        ".gif",
        "github.com",
        "fb.com",
        "email.com",
        "Email.com",
        "company.com",
        "acme.com",
        "mysite.com",
        "domain.com",
        ".wixpress.com",
        "gmail.com",
        "example.com",
        ".mov",
        ".webm",
        "sentry.io",
        "@x.com",
        "@twitter.com",
        "@producthunt.com",
      ];
      return !forbiddenExtensions.some((extension) =>
        email.endsWith(extension)
      );
    });
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
    return [];
  }
}

async function crawlWebsite(startUrl: string): Promise<{
  mainPageUrl: string;
  foundEmailsUrls: { url: string; emails: string[] }[];
}> {
  const visited = new Set<string>();
  const queue = [startUrl];
  const foundEmailsUrls: { url: string; emails: string[] }[] = [];

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    if (!currentUrl || visited.has(currentUrl)) {
      continue;
    }

    visited.add(currentUrl);

    try {
      const emailAddresses = await findEmailAddresses(currentUrl);

      if (emailAddresses.length > 0) {
        foundEmailsUrls.push({ url: currentUrl, emails: emailAddresses });
      }

      const response = await axios.get(currentUrl);
      const htmlText = response.data;

      // Dummy code to extract links from HTML text
      const linksRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
      let match;
      while ((match = linksRegex.exec(htmlText)) !== null) {
        const absoluteUrl = new URL(match[2], currentUrl).href;
        queue.push(absoluteUrl);
      }
    } catch (error) {
      console.error(`Error while processing ${currentUrl}: ${error}`);
    }
  }

  return { mainPageUrl: startUrl, foundEmailsUrls };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { inputData }: { inputData: string[] } = req.body;

    const allWebsitesData: Array<
      Promise<{
        mainPageUrl: string;
        foundEmailsUrls: { url: string; emails: string[] }[];
      }>
    > = [];
    for (const startUrl of inputData) {
      allWebsitesData.push(crawlWebsite(startUrl));
    }

    const results = await Promise.all(allWebsitesData);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
