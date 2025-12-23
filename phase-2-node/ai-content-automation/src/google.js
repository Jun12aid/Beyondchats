import axios from "axios";
import "dotenv/config";

const SERP_API_KEY = process.env.SERP_API_KEY;

/**
 * Search Google using SerpAPI and return top 2 external article links
 */
export async function searchGoogle(query) {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        engine: "google",
        q: query,
        api_key: SERP_API_KEY,
        num: 10,
      },
    });

    const results = response.data.organic_results || [];

    const filtered = results.filter((item) => {
      if (!item.link) return false;
      if (item.link.includes("beyondchats.com")) return false;
      return true;
    });

    return filtered.slice(0, 2).map((item) => ({
      title: item.title,
      url: item.link,
    }));
  } catch (error) {
    console.error("❌ SerpAPI search failed:", error.message);
    throw error;
  }
}
