import axios from "axios";
import "dotenv/config";

const LARAVEL_API = process.env.LARAVEL_API_BASE;

/**
 * Publish rewritten article to Laravel
 */
export async function publishArticle({
  title,
  content,
  originalArticleId,
  references,
}) {
  try {
    const response = await axios.post(`${LARAVEL_API}/articles`, {
      title: title + " (Updated)",
      content,
      source_url: "ai-generated",
      original_article_id: originalArticleId,
      is_ai_generated: true,
      references,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to publish article:", error.message);
    throw error;
  }
}
