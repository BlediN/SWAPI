export async function fetchUnsplashImage(query) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}`
  );

  if (!res.ok) {
    console.error("Error fetching image from Unsplash:", res.status);
    return null;
  }

  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].urls.regular;
  }

  return null; // fallback or default image URL
}
