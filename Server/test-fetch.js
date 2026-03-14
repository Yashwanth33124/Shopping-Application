const test = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/products?category=men");
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
};

test();
