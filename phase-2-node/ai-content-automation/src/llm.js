import Groq from "groq-sdk";
import "dotenv/config";
import { chunkText } from "./utils.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Rewrite original article using reference articles (TOKEN SAFE)
 */
export async function rewriteArticle({
  originalTitle,
  originalContent,
  referenceArticles,
}) {
  // 🔹 Compress references (VERY IMPORTANT)
  const referencesText = referenceArticles
    .map((ref, index) => `• ${ref.title}`)
    .join("\n");

  const contentChunks = chunkText(originalContent, 2500);
  let finalArticle = "";

  for (let i = 0; i < contentChunks.length; i++) {
    console.log(`✍️ Rewriting chunk ${i + 1}/${contentChunks.length}`);

    const prompt = `
You are a professional content writer.

TASK:
Rewrite and enhance the ORIGINAL ARTICLE CHUNK using insights
from the REFERENCE TITLES.

RULES:
- Do NOT copy sentences
- Keep content original
- Improve clarity, SEO, and structure
- Use headings and short paragraphs
- Do NOT mention AI or references

ARTICLE TITLE:
${originalTitle}

REFERENCE TITLES:
${referencesText}

ORIGINAL CONTENT CHUNK:
${contentChunks[i]}

OUTPUT:
Return ONLY rewritten content for this chunk.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    finalArticle += completion.choices[0].message.content.trim() + "\n\n";
  }

  return finalArticle.trim();
}
