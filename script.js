let cart = 0;

function addToCart() {
  cart++;
  document.getElementById("cart-count").innerText = cart;
  document.getElementById("total-items").innerText = cart;
}

function checkout() {
  if (cart === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Redirecting to payment...");
    window.location.href = "payment.html";
  }
}

function searchProducts() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.querySelectorAll(".product");

  products.forEach(product => {
    let name = product.innerText.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}
