import { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

let web_brower = null;
async function web_tab(url: string, browser) {
  const start = new Date().getTime();
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const resource = request.resourceType();
      if (
        resource === "image" ||
        resource === "media" ||
        resource === "font" ||
        resource === "stylesheet"
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
    const html = await page.content();
    const end = new Date().getTime();
    await writeToFile(
      "web_driver processed page: " + url + " time " + (end - start) / 60000.0
    );
    return html;
  } catch (error) {
  } finally {
    await page.close();
  }
}
async function web_driver() {
  let browser;
  try {
    //  this launch new instance browser \
    // { waitUntil: 'networkidle0' }
    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
      devtools: true,
    });
    return browser;
  } catch (error) {
    console.error(error);
  }

  return "";
}

async function findEmailAddresses($, url): Promise<string[]> {
  try {
    // const response = await axios.get(url, {
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    //   },
    // });
    // const html = response.data;
    //  const demo = await  web_tab(url,web_brower);
    //  const start = new Date().getTime();
    //   const $ = cheerio.load( demo);
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
          "linkedin.com",
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

async function writeToFile(text: string) {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format

  const filePath = path.join(process.cwd(), "logs", `log_${formattedDate}.txt`);

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const currentTime = new Date().toISOString();
  const logEntry = `[${currentTime}] : ${text}\n`;
  fs.appendFileSync(filePath, logEntry, "utf8");
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
        const demo = await web_tab(currentUrl, web_brower);
        if (demo === "") continue;
        const start = new Date().getTime();
        const $ = cheerio.load(demo);
        const emailAddresses = await findEmailAddresses($, currentUrl);

        if (emailAddresses.length > 0) {
          const websiteData = {
            mainPageUrl: startUrl,
            foundEmailsUrls: [
              {
                url: currentUrl,
                emails: emailAddresses,
              },
            ],
          };
          allWebsitesData.push(websiteData);
          break; // Stop crawling this website after finding emails
        }

        // const response = await axios.get(currentUrl, {
        //   headers: {
        //     "User-Agent":
        //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        //   },
        // });
        // const html = response.data;
        // const $ = cheerio.load(html);
        const links = $("a[href]");
        links.each((index, element) => {
          const absoluteUrl = new URL($(element).attr("href")!, currentUrl)
            .href;
          queue.push(absoluteUrl);
        });

        const end = new Date().getTime();

        await writeToFile(
          "cheerio processed page: " +
            currentUrl +
            " time " +
            (end - start) / 60000.0
        );
        // Add delay to avoid rate limiting
        // await new Promise((resolve) => setTimeout(resolve, 1000));
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
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { startingUrls } = req.body;

  if (!startingUrls || !Array.isArray(startingUrls)) {
    res.status(400).json({ message: "Starting URLs are required" });
    return;
  }

  try {
    const start = new Date().getTime();
    web_brower = await web_driver();
    const allWebsitesData = await crawlWebsite(startingUrls);
    res.status(200).json({ websites: allWebsitesData });
    const end = new Date().getTime();

    await writeToFile(
      "process complete for  page: " +
        startingUrls +
        " time " +
        (end - start) / 60000.0
    );
  } catch (error) {
    console.error(`Error while crawling websites: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    web_brower.close();
  }
}
