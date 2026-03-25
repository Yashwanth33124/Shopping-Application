const test = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/products?category=men");
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      console.log("Keys of first product:", Object.keys(data.data[0]));
      console.log("Category of first product:", data.data[0].category);
      console.log("Full first product:", JSON.stringify(data.data[0], null, 2));
    } else {
      console.log("No data found for category 'men'");
    }
  } catch (err) {
    console.error(err.message);
  }
};
test();
