
export const getImgUrl = (path) => {
  if (!path) return "";
  
  // If it's already an absolute URL (like Cloudinary), return it as is
  if (path.startsWith("http")) return path;

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // For local development, often we want just /path
  // But to be safe with Vite and subpaths, we check BASE_URL
  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // Ensure we don't have double slashes
  const finalBase = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
  
  return finalBase + cleanPath;
};
