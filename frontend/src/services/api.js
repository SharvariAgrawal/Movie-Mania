const API_KEY = "9bc526d2"; // User's OMDb API key
const BASE_URL = "https://www.omdbapi.com/";

async function fetchMultiplePages(urlBuilder, maxPages = 5) {
    let allResults = [];
    for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(urlBuilder(page));
        const data = await response.json();
        if (data.Response === "True") {
            allResults = allResults.concat(data.Search);
            if (data.Search.length < 10) break; // No more pages
        } else {
            if (page === 1) throw new Error(data.Error || "Failed to fetch movies");
            break;
        }
    }
    return allResults;
}

export const getPopularMovies = async () => {
    // For popular movies, we'll search for a common term that returns many results
    return fetchMultiplePages((page) => `${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&page=${page}`);
};

export const searchMovies = async (query) => {
    return fetchMultiplePages((page) => `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`);
};