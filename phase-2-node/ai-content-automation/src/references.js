/**
 * Append references to rewritten article content
 */
export function appendReferences(content, references) {
  let refText = "\n\n---\n\nReferences:\n";

  references.forEach((ref, index) => {
    refText += `${index + 1}. ${ref.title} – ${ref.url}\n`;
  });

  return content + refText;
}
