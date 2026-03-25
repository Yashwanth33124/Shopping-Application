const BASE_URL = "http://localhost:3001/api";

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/products?category=${category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    // Filter out duplicate products based on their image URL
    // so the UI doesn't render the exact same image twice
    const uniqueProducts = [];
    const seenImages = new Set();
    
    for (const product of data.data) {
      if (!seenImages.has(product.image)) {
        uniqueProducts.push(product);
        seenImages.add(product.image);
      }
    }
    
    return uniqueProducts;
  } catch (error) {
    console.error(`Error fetching products for ${category}:`, error);
    return [];
  }
};
