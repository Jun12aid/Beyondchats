import axios from "axios";
import "dotenv/config";

const LARAVEL_API = process.env.LARAVEL_API_BASE;

/**
 * Fetch the latest article from Laravel
 */
export async function fetchLatestArticle() {
  try {
    const response = await axios.get(`${LARAVEL_API}/articles`);

    const articles = response.data;

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error("No articles found in Laravel API");
    }

    // Sort by created_at DESC
    articles.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    return articles[0]; // latest article
  } catch (error) {
    console.error("❌ Failed to fetch latest article:", error.message);
    throw error;
  }
}
