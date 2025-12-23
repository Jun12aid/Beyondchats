import { Routes, Route } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import ArticleList from "./pages/ArticleList";



function App() {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
    </Routes>
  );

}

export default App;
