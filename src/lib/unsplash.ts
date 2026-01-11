const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export async function fetchImages(page = 1) {
  const res = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=12`,
    {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }

  return res.json();
}
