import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API_BASE}/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Failed to fetch article", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Link to="/" className="text-blue-600 text-sm">
        ← Back to articles
      </Link>

      <div className="bg-white rounded-lg shadow p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{article.title}</h1>

          {article.is_ai_generated && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              AI Updated
            </span>
          )}
        </div>

        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
          {article.content}
        </div>

        {/* References */}
        {article.is_ai_generated && article.references?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">References</h3>
            <ul className="list-disc list-inside text-sm text-blue-600">
              {article.references.map((ref, index) => (
                <li key={index}>
                  <a href={ref} target="_blank" rel="noreferrer">
                    {ref}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleDetail;
