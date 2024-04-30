import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

function joinUrl(base: string, relative: string): string {
  const url = new URL(relative, base);
  return url.toString();
}

async function findEmailAddresses(url: string): Promise<string[]> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const emailAddresses: string[] = [];

    $("a[href], p, span, li, td").each((index, element) => {
      const text = $(element).text();
      const extractedEmails =
        text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) ||
        [];
      emailAddresses.push(...extractedEmails);
    });

    const filteredEmailAddresses = Array.from(emailAddresses).filter(
      (email) => {
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
        ];
        return !forbiddenExtensions.some((extension) =>
          email.endsWith(extension)
        );
      }
    );

    return Array.from(new Set(filteredEmailAddresses));
  } catch (error) {
    console.error(`Error while processing ${url}: ${error}`);
    throw new Error(
      `Error while processing ${url}: ${(error as Error).message}`
    );
  }
}

async function findLinkedinUrls(url: string): Promise<string[]> {
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

async function crawlWebsite(startUrls: string[]) {
  const allWebsitesData: any[] = [];

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
        const linkedinUrls = await findLinkedinUrls(currentUrl);

        if (emailAddresses.length && linkedinUrls.length > 0) {
          const websiteData = {
            mainPageUrl: startUrl,
            foundEmailsUrls: [
              {
                url: currentUrl,
                emails: emailAddresses,
                linkedinUrls: linkedinUrls,
              },
            ],
          };
          allWebsitesData.push(websiteData);
          break; // Stop crawling this website after finding emails
        }

        // if (linkedinUrls.length > 0) {
        //   const websiteData = {
        //     mainPageUrl: startUrl,
        //     linkedinUrls: linkedinUrls,
        //   };
        //   allWebsitesData.push(websiteData);
        //   break; // Stop crawling this website after finding LinkedIn URLs
        // }

        const response = await fetch(currentUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        const links = $("a[href]");
        links.each((index, element) => {
          const absoluteUrl = new URL($(element).attr("href")!, currentUrl)
            .href;
          queue.push(absoluteUrl);
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
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { startingUrls } = req.body;

  if (!startingUrls || !Array.isArray(startingUrls)) {
    return res.status(400).json({ message: "Starting URLs are required" });
  }

  try {
    const allWebsitesData = await crawlWebsite(startingUrls);
    res.status(200).json({ websites: allWebsitesData });
  } catch (error) {
    console.error(`Error while crawling websites: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
