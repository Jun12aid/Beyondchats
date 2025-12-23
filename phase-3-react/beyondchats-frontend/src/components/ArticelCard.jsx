import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
    const isAI = article.is_ai_generated;

    return (
        <Link to={`/articles/${article.id}`}>
            <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{article.title}</h2>

                    {isAI ? (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            AI Updated
                        </span>
                    ) : (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Original
                        </span>
                    )}
                </div>

                <p className="text-gray-600 text-sm mb-4">
                    {article.content.slice(0, 200)}...
                </p>

                <div className="mt-auto text-xs text-gray-400">
                    {new Date(article.created_at).toLocaleDateString()}
                </div>
            </div>
        </Link>
    );
}
