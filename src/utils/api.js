const BASE_URL = "http://localhost:3001/api";

export const fetchProductsByCategory = async (category) => {
  try {
    const url = `${BASE_URL}/products?category=${category}&limit=200`;
    console.log(`Fetching products for ${category} from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Successfully fetched ${data.data?.length || 0} products for ${category}`);

    // Filter out duplicate products based on their image URL
    const uniqueProducts = [];
    const seenImages = new Set();
    
    if (data.data && Array.isArray(data.data)) {
        for (const product of data.data) {
          if (!seenImages.has(product.image)) {
            uniqueProducts.push(product);
            seenImages.add(product.image);
          }
        }
    }
    
    console.log(`Returning ${uniqueProducts.length} unique products for ${category}`);
    return uniqueProducts;
  } catch (error) {
    console.error(`Error fetching products for ${category}:`, error);
    return [];
  }
};
