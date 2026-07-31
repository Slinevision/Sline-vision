let cart = 0;

function addToCart() {
  cart++;
  document.getElementById("cart-count").innerText = cart;
}

function searchProducts() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.getElementsByClassName("product");

  for (let i = 0; i < products.length; i++) {
    let title = products[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

    if (title.includes(input)) {
      products[i].style.display = "block";
    } else {
      products[i].style.display = "none";
    }
  }
}
