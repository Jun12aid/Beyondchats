import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
});

/**
 * Fetch all articles from Laravel
 */
export async function fetchArticles() {
  const response = await api.get("/articles");
  return response.data;
}