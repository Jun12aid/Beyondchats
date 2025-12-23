import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "../components/ArticelCard";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | original | ai

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (filter === "original") return !article.is_ai_generated;
    if (filter === "ai") return article.is_ai_generated;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">BeyondChats Articles</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <FilterButton
          label="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <FilterButton
          label="Original"
          active={filter === "original"}
          onClick={() => setFilter("original")}
        />
        <FilterButton
          label="AI Updated"
          active={filter === "ai"}
          onClick={() => setFilter("ai")}
        />
      </div>

      {/* Article Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <p className="text-gray-500 mt-10 text-center">
          No articles found for this filter.
        </p>
      )}
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-sm font-medium transition
        ${
          active
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-200"
        }`}
    >
      {label}
    </button>
  );
}

export default ArticleList;
