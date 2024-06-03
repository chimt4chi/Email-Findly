import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";
import { URL } from "url";

async function findEmailAddresses(url: string): Promise<string[]> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const emailAddresses: string[] = [];

    $("a[href], p, span, li, td").each((index, element) => {
      const text = $(element).text();
      const extractedEmails =
        text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) ||
        [];
      emailAddresses.push(...extractedEmails);
    });

    const forbiddenExtensions = [
      ".png",
      ".jpeg",
      ".jpg",
      ".pdf",
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
      "linkedin.com",
    ];

    const filteredEmailAddresses = emailAddresses.filter(
      (email) =>
        !forbiddenExtensions.some((extension) => email.endsWith(extension))
    );

    return Array.from(new Set(filteredEmailAddresses));
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
    throw new Error(
      `Error while processing ${url}: ${(error as Error).message}`
    );
  }
}

async function crawlWebsite(startUrls: string[]) {
  const allWebsitesData: object[] = [];

  for (const startUrl of startUrls) {
    const visited = new Set<string>();
    const queue: string[] = [startUrl];

    while (queue.length > 0) {
      const currentUrl = queue.shift();
      if (!currentUrl || visited.has(currentUrl)) {
        continue;
      }
      visited.add(currentUrl);
      try {
        const emailAddresses = await findEmailAddresses(currentUrl);

        if (emailAddresses.length > 0) {
          const websiteData = {
            mainPageUrl: startUrl,
            foundEmailsUrls: [{ url: currentUrl, emails: emailAddresses }],
          };
          allWebsitesData.push(websiteData);
          break; // Stop crawling this website after finding emails
        }

        const response = await axios.get(currentUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const links = $("a[href]");
        links.each((index, element) => {
          const href = $(element).attr("href");
          if (href) {
            try {
              const absoluteUrl = new URL(href, currentUrl).href;
              if (!visited.has(absoluteUrl)) {
                queue.push(absoluteUrl);
              }
            } catch (e) {
              // Invalid URL, skip it
              console.log(`please check the URL ${e}`);
            }
          }
        });
      } catch (error) {
        console.error(`Error while processing ${currentUrl}: ${error}`);
      }
    }
  }

  return allWebsitesData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { startingUrls } = req.body;

  if (!startingUrls || !Array.isArray(startingUrls)) {
    res
      .status(400)
      .json({ message: "Starting URLs are required and must be an array" });
    return;
  }

  try {
    const allWebsitesData = await crawlWebsite(startingUrls);
    res.status(200).json({ websites: allWebsitesData });
  } catch (error) {
    console.error(`Error while crawling websites: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
