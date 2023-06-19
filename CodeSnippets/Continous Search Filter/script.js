// Function to filter products based on search input and filters
function filterProducts() {
    const searchKeyword = $("#searchInput").val().toLowerCase();
    const categoryFilter = $("#categoryFilter").val();
    const priceFilter = $("#priceFilter").val();
  
    const filteredProducts = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchKeyword);
      const categoryMatch = categoryFilter === "" || product.category === categoryFilter;
      const priceMatch =
        priceFilter === "" ||
        (priceFilter === "under25" && product.price < 25) ||
        (priceFilter === "25to50" && product.price >= 25 && product.price <= 50) ||
        (priceFilter === "over50" && product.price > 50);
  
      return nameMatch && categoryMatch && priceMatch;
    });
  
    displayProducts(filteredProducts);
  }
  
  // Function to display the filtered products
  function displayProducts(products) {
    const productList = $("#productList");
    productList.empty();
  
    if (products.length === 0) {
      productList.append("<p>No products found.</p>");
    } else {
      products.forEach(product => {
        productList.append("<p>" + product.name + "</p>");
      });
    }
  }
  
  // Event listeners for search input and filter changes
  $("#searchInput, #categoryFilter, #priceFilter").on("input change", filterProducts);
  
  // Initial display of all products
  displayProducts(products);