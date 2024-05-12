import cheerio from "cheerio";
import fetch from "node-fetch";

export async function findEmailAddresses(url: string): Promise<string[]> {
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
