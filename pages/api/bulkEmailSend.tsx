import { NextApiRequest, NextApiResponse } from "next";
import cheerio from "cheerio";
import puppeteer, { Browser } from "puppeteer";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

interface EmailData {
  url: string;
  emails: string[];
}

interface WebsiteData {
  mainPageUrl: string;
  foundEmailsUrls: EmailData[];
}

let web_browser: Browser | null = null;
const cache: { [key: string]: { data: WebsiteData[]; expiry: number } } = {};
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

async function launchBrowser(): Promise<Browser | null> {
  try {
    console.log("Launching Puppeteer");
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("Puppeteer launched");
    return browser;
  } catch (error) {
    console.error(`Error launching Puppeteer: ${error}`);
    return null;
  }
}

async function processPage(
  url: string,
  browser: Browser
): Promise<string | undefined> {
  const start = Date.now();
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      const resource = request.resourceType();
      if (["image", "media", "font", "stylesheet"].includes(resource)) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
    const html = await page.content();
    const end = Date.now();
    await logToFile(
      `Processed page: ${url} in ${(end - start) / 60000} minutes`
    );
    return html;
  } catch (error) {
    console.error(`Error processing page ${url}: ${error}`);
    return undefined;
  } finally {
    await page.close();
  }
}

async function findEmailAddresses($: cheerio.Root): Promise<string[]> {
  const emailAddresses: string[] = [];
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

  $("a[href], p, span, li, td").each((_, element) => {
    // if (emailAddresses.length >= 5) {
    //   return false; // Exit loop if 5 emails are found
    // }
    const text = $(element).text();
    const emails =
      text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
    emailAddresses.push(
      ...emails.filter(
        (email) =>
          !forbiddenExtensions.some((extension) => email.endsWith(extension))
      )
    );
  });

  return Array.from(
    new Set(
      emailAddresses.filter(
        (email) =>
          !forbiddenExtensions.some((extension) => email.endsWith(extension))
      )
    )
  );
}

async function logToFile(text: string) {
  const currentDate = new Date().toISOString().split("T")[0];
  const filePath = path.join(process.cwd(), "logs", `log_${currentDate}.txt`);

  try {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    const logEntry = `[${new Date().toISOString()}] : ${text}\n`;
    fs.appendFileSync(filePath, logEntry, "utf8");
  } catch (error) {
    console.error(`Failed to write to log file: ${error}`);
  }
}

async function crawlWebsite(startUrls: string[]): Promise<WebsiteData[]> {
  const allWebsitesData: WebsiteData[] = [];

  for (const startUrl of startUrls) {
    const visited = new Set<string>();
    const queue: string[] = [startUrl];

    while (queue.length > 0) {
      const currentUrl = queue.shift();
      if (!currentUrl || visited.has(currentUrl)) continue;

      visited.add(currentUrl);
      const html = await processPage(currentUrl, web_browser!);
      if (!html) continue;

      const $ = cheerio.load(html);
      const emailAddresses = await findEmailAddresses($);

      if (emailAddresses.length > 0) {
        allWebsitesData.push({
          mainPageUrl: startUrl,
          foundEmailsUrls: [{ url: currentUrl, emails: emailAddresses }],
        });
        break;
      }

      $("a[href]").each((_, element) => {
        const absoluteUrl = new URL($(element).attr("href")!, currentUrl).href;
        queue.push(absoluteUrl);
      });
    }
  }

  return allWebsitesData;
}

async function sendEmail(emailAddresses: string[]) {
  try {
    const transporter = nodemailer.createTransport({
      // server: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: "Extracted Email Addresses",
      text: `Here are the extracted email addresses:\n\n${emailAddresses.join(
        "\n"
      )}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { startingUrls } = req.body;
  if (!Array.isArray(startingUrls)) {
    return res.status(400).json({ message: "Starting URLs are required" });
  }

  try {
    const cacheKey = JSON.stringify(startingUrls);
    const cachedData = cache[cacheKey];

    if (cachedData && cachedData.expiry > Date.now()) {
      return res.status(200).json({ websites: cachedData.data });
    }

    web_browser = await launchBrowser();
    if (!web_browser) {
      throw new Error("Failed to launch the web browser");
    }

    const allWebsitesData = await crawlWebsite(startingUrls);

    cache[cacheKey] = {
      data: allWebsitesData,
      expiry: Date.now() + CACHE_TTL,
    };

    const emailAddresses = allWebsitesData.flatMap((website) =>
      website.foundEmailsUrls.flatMap((emailsUrl) => emailsUrl.emails)
    );
    await sendEmail(emailAddresses);

    res.status(200).json({ websites: allWebsitesData });
  } catch (error) {
    console.error(`Error while crawling websites: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (web_browser) {
      await web_browser.close();
    }
  }
}
