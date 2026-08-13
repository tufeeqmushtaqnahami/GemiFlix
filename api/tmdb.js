const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const ALLOWED_ENDPOINTS = [
  "movie/now_playing",
  "movie/popular",
  "movie/top_rated",
  "movie/upcoming",
  "trending/movie/week",
  "discover/movie",
  "genre/movie/list",
];

module.exports = async (req, res) => {
  try {
    const { endpoint, ...queryParams } = req.query;

    if (!endpoint) {
      return res.status(400).json({
        error: "Missing TMDB endpoint",
      });
    }

    if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
      return res.status(403).json({
        error: "TMDB endpoint not allowed",
      });
    }

    const url = new URL(`${TMDB_BASE_URL}/${endpoint}`);

    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          url.searchParams.append(key, item);
        });
      } else if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("TMDB Proxy Error:", error);

    return res.status(500).json({
      error: "Failed to fetch data from TMDB",
    });
  }
};