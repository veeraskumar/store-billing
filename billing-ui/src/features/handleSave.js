const handleSave = (products) => {
  const filtered = products.filter(
    (p) => p.labelNo.trim() || p.productName.trim() || p.price.toString().trim()
  );
  localStorage.setItem("products", JSON.stringify(filtered));
  alert("Products saved to localStorage!");
};

export default handleSave;
