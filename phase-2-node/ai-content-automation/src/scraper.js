import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrape main readable content from an article URL
 */
export async function scrapeArticle(url) {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove noise
    $("script, style, nav, footer, header, ads, iframe").remove();

    let content = "";

    // Priority-based extraction
    if ($("article").length) {
      content = $("article").text();
    } else if ($("main").length) {
      content = $("main").text();
    } else if (
      $(".post-content").length ||
      $(".article-content").length ||
      $(".content").length
    ) {
      content =
        $(".post-content").text() ||
        $(".article-content").text() ||
        $(".content").text();
    } else {
      // Fallback: paragraphs
      $("p").each((_, el) => {
        content += $(el).text() + "\n\n";
      });
    }

    // Clean whitespace
    content = content.replace(/\s+/g, " ").trim();

    if (content.length < 300) {
      throw new Error("Extracted content too short");
    }

    return content;
  } catch (error) {
    console.error(`❌ Failed to scrape ${url}:`, error.message);
    return null;
  }
}
