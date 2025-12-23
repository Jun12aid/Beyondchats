import { fetchLatestArticle } from "./laravel.js";
import { searchGoogle } from "./google.js";
import { scrapeArticle } from "./scraper.js";
import { rewriteArticle } from "./llm.js";
import { appendReferences } from "./references.js";
import { publishArticle } from "./publisher.js";

const run = async () => {
  // 1️⃣ Fetch latest article
  const original = await fetchLatestArticle();
  console.log("📝 Original article:", original.title);

  // 2️⃣ Google search
  const searchResults = await searchGoogle(original.title);

  // 3️⃣ Scrape reference articles
  const referenceArticles = [];
  for (const result of searchResults) {
    const content = await scrapeArticle(result.url);
    if (content) {
      referenceArticles.push({
        title: result.title,
        url: result.url,
        content,
      });
    }
  }

  if (referenceArticles.length < 2) {
    throw new Error("Not enough reference articles found");
  }

  // 4️⃣ Rewrite using Groq
  const rewritten = await rewriteArticle({
    originalTitle: original.title,
    originalContent: original.content,
    referenceArticles,
  });

  // 5️⃣ Append references
  const finalContent = appendReferences(
    rewritten,
    referenceArticles.map((r) => ({
      title: r.title,
      url: r.url,
    }))
  );

  // 6️⃣ Publish to Laravel
  const published = await publishArticle({
    title: original.title,
    content: finalContent,
    originalArticleId: original.id,
    references: referenceArticles.map((r) => r.url),
  });

  console.log("✅ Updated article published with ID:", published.id);
};

run();
