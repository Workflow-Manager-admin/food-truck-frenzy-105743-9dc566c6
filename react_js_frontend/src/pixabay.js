/**
 * Utility method for searching images on Pixabay.
 * API docs: https://pixabay.com/api/docs/
 * API key taken from REACT_APP_PIXABAY_API_KEY environment variable.
 */

// PUBLIC_INTERFACE
export async function searchPixabayImages(query, options = {}) {
  /**
   * Fetch images from Pixabay public API.
   * @param {string} query - Keyword(s) to search.
   * @param {object} options - Additional parameters (per_page, etc).
   * @returns {Promise<object>} - The API json response or error.
   */

  const apiKey = process.env.REACT_APP_PIXABAY_API_KEY;
  if (!apiKey) {
    throw new Error("Pixabay API key not set. Add REACT_APP_PIXABAY_API_KEY to your .env file.");
  }
  const base = "https://pixabay.com/api/";
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    image_type: "photo",
    safesearch: "true",
    ...options,
  });
  const url = `${base}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Pixabay API Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
