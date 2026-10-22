/** Sample media shared by placeholder services. TODO: replace per service. */
export const sampleVideo = (title: string, n = 0) => {
  const clips = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  ];
  const posters = [
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=70",
    "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1200&q=70",
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=70",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=70",
  ];
  return { src: clips[n % clips.length], poster: posters[n % posters.length], title };
};
