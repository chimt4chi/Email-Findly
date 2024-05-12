import axios from "axios";
import cheerio from "cheerio";

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
