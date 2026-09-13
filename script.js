/* =========================================
   SLINEVISION STORE
========================================= */

/*
  Replace these demo products with your
  actual SLINEVISION products.
*/

const products = [
  {
    id: 1,
    name: "VISION CORE TEE",
    category: "T-Shirts",
    gender: "Men",
    price: 450,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "A clean everyday streetwear essential with the SLINEVISION identity."
  },

  {
    id: 2,
    name: "SHADOW OVERSIZED TEE",
    category: "T-Shirts",
    gender: "Unisex",
    price: 480,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    description: "Oversized silhouette designed for a relaxed streetwear fit."
  },

  {
    id: 3,
    name: "VISION HOODIE",
    category: "Hoodies",
    gender: "Unisex",
    price: 850,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description: "Heavyweight hoodie with a minimal SLINEVISION aesthetic."
  },

  {
    id: 4,
    name: "LEGACY HOODIE",
    category: "Hoodies",
    gender: "Men",
    price: 900,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    description: "A premium streetwear hoodie built for everyday wear."
  },

  {
    id: 5,
    name: "SHADOW SET",
    category: "Sets",
    gender: "Women",
    price: 1100,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    description: "Matching streetwear set with a bold monochrome aesthetic."
  },

  {
    id: 6,
    name: "ICON SET",
    category: "Sets",
    gender: "Unisex",
    price: 1200,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    description: "A complete look designed around the SLINEVISION identity."
  },

  {
    id: 7,
    name: "VISION CAP",
    category: "Accessories",
    gender: "Unisex",
    price: 350,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    description: "Minimal everyday cap finished with a clean streetwear look."
  },

  {
    id: 8,
    name: "SIGNATURE BAG",
    category: "Accessories",
    gender: "Unisex",
    price: 500,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    description: "Compact everyday bag for the SLINEVISION lifestyle."
  }
];


/* =========================================
   STATE
========================================= */

let cart = JSON.parse(localStorage.getItem("slinevisionCart")) || [];

let currentFilter = "All";
let currentSearch = "";
let selectedProduct = null;
let selectedSize = "M";


/* =========================================
   ELEMENTS
========================================= */

const productsGrid = document.getElementById("productsGrid");
const noProducts = document.getElementById("noProducts");

const cartElement = document.getElementById("cart");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const overlay = document.getElementById("overlay");

const productModal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const modalAdd = document.getElementById("modalAdd");

const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");


/* =========================================
   FORMAT PRICE
========================================= */

function money(amount) {
  return `R${amount.toLocaleString("en-ZA")}`;
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {

  const filtered = products.filter(product => {

    const matchesFilter =
      currentFilter === "All" ||
      product.category === currentFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(
        currentSearch.toLowerCase()
      ) ||
      product.category.toLowerCase().includes(
        currentSearch.toLowerCase()
      );

    return matchesFilter && matchesSearch;
  });

  productsGrid.innerHTML = "";

  if (!filtered.length) {
    noProducts.style.display = "block";
    return;
  }

  noProducts.style.display = "none";

  filtered.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${
          product.id === 1
            ? `<span class="product-tag">NEW</span>`
            : ""
        }

      </div>

      <div class="product-info">

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-category">
          ${product.category}
        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>

      </div>
    `;

    card.addEventListener("click", () => {
      openProduct(product);
    });

    productsGrid.appendChild(card);
  });
}


/* =========================================
   PRODUCT MODAL
========================================= */

function openProduct(product) {

  selectedProduct = product;

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalName.textContent = product.name;
  modalPrice.textContent = money(product.price);
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;

  selectedSize = "M";

  document.querySelectorAll(".sizes button").forEach(button => {
    button.classList.remove("selected");

    if (button.textContent === "M") {
      button.classList.add("selected");
    }
  });

  productModal.classList.add("show");
}


function closeProduct() {
  productModal.classList.remove("show");
}


/* =========================================
   SIZE SELECTOR
========================================= */

document.querySelectorAll(".sizes button").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".sizes button")
      .forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");

    selectedSize = button.textContent;
  });

});


/* =========================================
   ADD TO CART
========================================= */

function addToCart(product, size = "M") {

  const existing = cart.find(item =>
    item.id === product.id &&
    item.size === size
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }

  saveCart();

  closeProduct();

  openCart();
}


/* =========================================
   CART
========================================= */

function saveCart() {

  localStorage.setItem(
    "slinevisionCart",
    JSON.stringify(cart)
  );

  renderCart();
}


function renderCart() {

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    count += item.quantity;

    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <div class="cart-item-name">
          ${item.name}
        </div>

        <div class="cart-item-price">
          Size: ${item.size}<br>
          ${money(item.price)} × ${item.quantity}
        </div>

      </div>

      <button
        class="remove-item"
        data-index="${index}"
      >
        REMOVE
      </button>

    `;

    cartItems.appendChild(element);
  });

  cartTotal.textContent = money(total);
  cartCount.textContent = count;

  cartEmpty.style.display =
    cart.length ? "none" : "block";

  document.querySelectorAll(".remove-item")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.index);

        cart.splice(index, 1);

        saveCart();
      });

    });
}


function openCart() {

  cartElement.classList.add("open");
  overlay.classList.add("show");
}


function closeCart() {

  cartElement.classList.remove("open");
  overlay.classList.remove("show");
}


/* =========================================
   FILTERS
========================================= */

document.querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".filter")
        .forEach(btn =>
          btn.classList.remove("active")
        );

      button.classList.add("active");

      currentFilter = button.dataset.filter;

      renderProducts();
    });

  });


/* =========================================
   CATEGORY LINKS
========================================= */

document.querySelectorAll("[data-category-link]")
  .forEach(link => {

    link.addEventListener("click", () => {

      const category =
        link.dataset.categoryLink;

      if (
        ["Men", "Women", "Sale"].includes(category)
      ) {
        currentFilter = "All";
      }

    });

  });


/* =========================================
   SEARCH
========================================= */

document.getElementById("searchBtn")
  .addEventListener("click", () => {

    searchPanel.classList.toggle("show");

    if (searchPanel.classList.contains("show")) {
      searchInput.focus();
    }

  });


searchInput.addEventListener("input", event => {

  currentSearch = event.target.value;

  renderProducts();

});


/* =========================================
   MENU
========================================= */

document.getElementById("menuBtn")
  .addEventListener("click", () => {

    document.getElementById("nav")
      .classList.toggle("open");

  });


/* =========================================
   CART BUTTONS
========================================= */

document.getElementById("cartBtn")
  .addEventListener("click", openCart);

document.getElementById("cartClose")
  .addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);


/* =========================================
   MODAL BUTTONS
========================================= */

document.getElementById("modalClose")
  .addEventListener("click", closeProduct);

productModal.addEventListener("click", event => {

  if (event.target === productModal) {
    closeProduct();
  }

});


modalAdd.addEventListener("click", () => {

  if (!selectedProduct) return;

  addToCart(
    selectedProduct,
    selectedSize
  );

});


/* =========================================
   WHATSAPP ORDER
========================================= */

document.getElementById("whatsappBtn")
  .addEventListener("click", () => {

    if (!cart.length) {
      alert("Your bag is empty.");
      return;
    }

    /*
      CHANGE THIS NUMBER TO YOUR
      SLINEVISION WHATSAPP NUMBER.

      Use international format without +.
      Example South Africa:
      27821234567
    */

    const phone = "27821234567";

    let message =
      "Hi SLINEVISION! I would like to order:%0A%0A";

    cart.forEach(item => {

      message +=
        `• ${item.name} — Size ${item.size} — ${item.quantity}x — ${money(item.price * item.quantity)}%0A`;

    });

    const total = cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    message +=
      `%0ATotal: ${money(total)}`;

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    );

  });


/* =========================================
   CHECKOUT
========================================= */

document.getElementById("checkoutBtn")
  .addEventListener("click", () => {

    if (!cart.length) {
      alert("Your bag is empty.");
      return;
    }

    alert(
      "Checkout is ready to connect to your payment provider."
    );

  });


/* =========================================
   INITIAL LOAD
========================================= */

renderProducts();
renderCart();
