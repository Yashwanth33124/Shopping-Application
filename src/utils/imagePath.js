
/**
 * Utility to get correct image path based on environment base URL.
 * Vite handles import.meta.env.BASE_URL automatically.
 * 
 * Usage: 
 * import { getImgUrl } from '../../utils/imagePath'; (adjust path)
 * <img src={getImgUrl("/images/foo.jpg")} />
 */
export const getImgUrl = (path) => {
  if (!path) return "";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return import.meta.env.BASE_URL + cleanPath;
};
