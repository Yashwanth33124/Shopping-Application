import API_CONFIG from "../config/api.config.js";
import { store } from "../shoppingfiles/Redux/Store.jsx";

const BASE_URL = API_CONFIG.BASE_URL;

export const fetchProductsByCategory = async (category) => {
  try {
    const url = `${BASE_URL}/products?category=${category}&limit=50`;
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
    
    // Filter out Prime products for non-Prime users
    const isPrime = store.getState().auth?.isPrime || false;
    let filteredProducts = uniqueProducts;
    if (!isPrime) {
      filteredProducts = uniqueProducts.filter(p => p.role !== "prime");
      console.log(`User is NOT prime. Hiding prime products. Returning ${filteredProducts.length} products.`);
    } else {
      console.log(`User is Prime. Returning all ${filteredProducts.length} products.`);
    }
    
    return filteredProducts;
  } catch (error) {
    console.error(`Error fetching products for ${category}:`, error);
    return [];
  }
};
