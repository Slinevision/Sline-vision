/* =========================================
   SLINEVISION — MAIN JAVASCRIPT
========================================= */

/* PRODUCT DATA */

const products = [
  {
    id: 1,
    name: "VISION CORE TEE",
    category: "T-Shirts",
    gender: "Men",
    price: 450,
    oldPrice: null,
    tag: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "A clean everyday essential with a relaxed streetwear fit."
  },
  {
    id: 2,
    name: "SHADOW OVERSIZED TEE",
    category: "T-Shirts",
    gender: "Unisex",
    price: 480,
    oldPrice: null,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    description: "An oversized streetwear tee designed for everyday comfort."
  },
  {
    id: 3,
    name: "VISION HOODIE",
    category: "Hoodies",
    gender: "Unisex",
    price: 850,
    oldPrice: null,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description: "A premium-feel hoodie with a relaxed everyday silhouette."
  },
  {
    id: 4,
    name: "CORE ESSENTIAL HOODIE",
    category: "Hoodies",
    gender: "Men",
    price: 790,
    oldPrice: 950,
    tag: "SALE",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    description: "A versatile hoodie made for effortless everyday styling."
  },
  {
    id: 5,
    name: "SHADOW TRACK SUIT",
    category: "Track Suits",
    gender: "Women",
    price: 990,
    oldPrice: 1100,
    tag: "SALE",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    description: "A coordinated track suit with a relaxed streetwear fit."
  },
  {
    id: 6,
    name: "VISION TRACK SUIT",
    category: "Track Suits",
    gender: "Unisex",
    price: 1200,
    oldPrice: null,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    description: "A full track suit made for movement and everyday comfort."
  },
  {
    id: 7,
    name: "CORE SWEAT PANTS",
    category: "Sweat Pants",
    gender: "Unisex",
    price: 550,
    oldPrice: null,
    tag: "",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=85",
    description: "Relaxed sweat pants designed for everyday streetwear comfort."
  },
  {
    id: 8,
    name: "SHADOW SWEAT PANTS",
    category: "Sweat Pants",
    gender: "Men",
    price: 600,
    oldPrice: null,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1506629905607-d9b1c7e7f2e8?auto=format&fit=crop&w=900&q=85",
    description: "A clean sweat pant with a comfortable relaxed fit."
  }
];


/* ELEMENTS */

const productsGrid = document.getElementById("productsGrid");
const noProducts = document.getElementById("noProducts");

const searchBtn = document.getElementById("searchBtn");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cartClose");
const cartOverlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartCountHeading = document.getElementById("cartCountHeading");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");

const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalAdd = document.getElementById("modalAdd");

const checkoutBtn = document.getElementById("checkoutBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const discountOverlay = document.getElementById("discountOverlay");
const discountClose = document.getElementById("discountClose");
const discountForm = document.getElementById("discountForm");
const discountEmail = document.getElementById("discountEmail");
const discountMessage = document.getElementById("discountMessage");


/* STATE */

let activeFilter = "All";
let activeGender = "All";
let searchTerm = "";

let cartData = JSON.parse(localStorage.getItem("slinevision-cart")) || [];

let selectedProduct = null;
let selectedSize = "M";


/* CURRENCY */

function formatPrice(price) {
  return "R" + Number(price).toLocaleString("en-ZA");
}


/* SAVE CART */

function saveCart() {
  localStorage.setItem("slinevision-cart", JSON.stringify(cartData));
}


/* RENDER PRODUCTS */

function renderProducts() {

  if (!productsGrid) return;

  const filteredProducts = products.filter(product => {

    const matchesCategory =
      activeFilter === "All" ||
      product.category === activeFilter ||
      (activeFilter === "Sale" && product.oldPrice);

    const matchesGender =
      activeGender === "All" ||
      product.gender === activeGender ||
      product.gender === "Unisex";

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesGender && matchesSearch;

  });

  productsGrid.innerHTML = "";

  if (noProducts) {
    noProducts.style.display =
      filteredProducts.length === 0 ? "block" : "none";
  }

  filteredProducts.forEach(product => {

    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image-wrap">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${product.tag ? `
          <span class="product-tag">${product.tag}</span>
        ` : ""}

        <button
          class="quick-add"
          data-product-id="${product.id}"
          type="button"
        >
          QUICK ADD +
        </button>

      </div>

      <div class="product-info">

        <div class="product-info-top">
          <h3>${product.name}</h3>
          <span>${product.gender}</span>
        </div>

        <p class="product-category">${product.category}</p>

        <div class="product-price">

          <strong>${formatPrice(product.price)}</strong>

          ${product.oldPrice ? `
            <del>${formatPrice(product.oldPrice)}</del>
          ` : ""}

        </div>

      </div>
    `;

    card.addEventListener("click", event => {

      if (event.target.closest(".quick-add")) return;

      openProduct(product.id);

    });

    const quickAdd = card.querySelector(".quick-add");

    quickAdd.addEventListener("click", event => {

      event.stopPropagation();

      addToCart(product.id);

    });

    productsGrid.appendChild(card);

  });

}


/* FILTER BUTTONS */

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    activeFilter = button.dataset.filter || "All";

    activeGender = "All";

    renderProducts();

  });

});


/* CATEGORY LINKS */

document.querySelectorAll("[data-category-link]").forEach(link => {

  link.addEventListener("click", () => {

    activeFilter = link.dataset.categoryLink;
    activeGender = "All";

    document.querySelectorAll(".filter").forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === activeFilter
      );

    });

    renderProducts();

  });

});


/* GENDER LINKS */

document.querySelectorAll("[data-gender-link]").forEach(link => {

  link.addEventListener("click", () => {

    activeGender = link.dataset.genderLink;
    activeFilter = "All";

    document.querySelectorAll(".filter").forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.filter === "All"
      );

    });

    renderProducts();

  });

});


/* SEARCH */

if (searchBtn && searchPanel) {

  searchBtn.addEventListener("click", () => {

    searchPanel.classList.toggle("active");

    if (searchPanel.classList.contains("active")) {
      searchInput.focus();
    }

  });

}

if (searchInput) {

  searchInput.addEventListener("input", () => {

    searchTerm = searchInput.value.toLowerCase().trim();

    renderProducts();

  });

}


/* OPEN PRODUCT MODAL */

function openProduct(id) {

  selectedProduct = products.find(product => product.id === id);

  if (!selectedProduct) return;

  modalImage.src = selectedProduct.image;
  modalImage.alt = selectedProduct.name;

  modalName.textContent = selectedProduct.name;
  modalCategory.textContent = selectedProduct.category;
  modalPrice.textContent = formatPrice(selectedProduct.price);
  modalDescription.textContent = selectedProduct.description;

  productModal.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");

  selectedSize = "M";

  document.querySelectorAll(".sizes button").forEach(button => {

    button.classList.toggle(
      "selected",
      button.textContent.trim() === selectedSize
    );

  });

}


/* CLOSE PRODUCT MODAL */

function closeProductModal() {

  productModal.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");

}

if (modalClose) {
  modalClose.addEventListener("click", closeProductModal);
}

if (productModal) {

  productModal.addEventListener("click", event => {

    if (event.target === productModal) {
      closeProductModal();
    }

  });

}


/* SELECT SIZE */

document.querySelectorAll(".sizes button").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".sizes button").forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedSize = button.textContent.trim();

  });

});


/* ADD TO CART */

function addToCart(id, size = "M") {

  const product = products.find(item => item.id === id);

  if (!product) return;

  const existingItem = cartData.find(item =>
    item.id === id && item.size === size
  );

  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cartData.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });

  }

  saveCart();

  renderCart();

}


/* ADD FROM PRODUCT MODAL */

if (modalAdd) {

  modalAdd.addEventListener("click", () => {

    if (!selectedProduct) return;

    addToCart(selectedProduct.id, selectedSize);

    closeProductModal();

    openCart();

  });

}


/* REMOVE CART ITEM */

function removeFromCart(id, size) {

  cartData = cartData.filter(item =>
    !(item.id === id && item.size === size)
  );

  saveCart();

  renderCart();

}


/* CHANGE QUANTITY */

function changeQuantity(id, size, amount) {

  const item = cartData.find(item =>
    item.id === id && item.size === size
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(id, size);

    return;

  }

  saveCart();

  renderCart();

}


/* RENDER CART */

function renderCart() {

  if (!cartItems) return;

  cartItems.innerHTML = "";

  const totalItems = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;

  if (cartCountHeading) {
    cartCountHeading.textContent = totalItems;
  }

  cartTotal.textContent = formatPrice(totalPrice);

  cartEmpty.style.display =
    cartData.length === 0 ? "block" : "none";

  cartData.forEach(item => {

    const row = document.createElement("div");

    row.className = "cart-item";

    row.innerHTML = `

      <img src="${item.image}" alt="${item.name}">

      <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>SIZE: ${item.size}</p>

        <strong>${formatPrice(item.price)}</strong>

        <div class="quantity-controls">

          <button
            type="button"
            data-action="minus"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            data-action="plus"
          >+</button>

        </div>

        <button
          class="remove-item"
          type="button"
          data-action="remove"
        >
          REMOVE
        </button>

      </div>

    `;

    row.querySelector('[data-action="minus"]').addEventListener("click", () => {
      changeQuantity(item.id, item.size, -1);
    });

    row.querySelector('[data-action="plus"]').addEventListener("click", () => {
      changeQuantity(item.id, item.size, 1);
    });

    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      removeFromCart(item.id, item.size);
    });

    cartItems.appendChild(row);

  });

}


/* OPEN CART */

function openCart() {

  cart.classList.add("open");
  cartOverlay.classList.add("active");

  document.body.classList.add("no-scroll");

}


/* CLOSE CART */

function closeCart() {

  cart.classList.remove("open");
  cartOverlay.classList.remove("active");

  document.body.classList.remove("no-scroll");

}

if (cartBtn) {
  cartBtn.addEventListener("click", openCart);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCart);
}


/* WHATSAPP ORDERING */

if (whatsappBtn) {

  whatsappBtn.addEventListener("click", () => {

    if (cartData.length === 0) {

      alert("Your shopping bag is empty.");

      return;

    }

    const phoneNumber = "27821234567";

    let message = "Hello SLINEVISION! I would like to place an order:\n\n";

    cartData.forEach(item => {

      message +=
        `${item.name} | Size: ${item.size} | Quantity: ${item.quantity} | ${formatPrice(item.price * item.quantity)}\n`;

    });

    const total = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    message += `\nTOTAL: ${formatPrice(total)}`;

    const whatsappURL =
      "https://wa.me/" + phoneNumber +
      "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

  });

}


/* CHECKOUT */

if (checkoutBtn) {

  checkoutBtn.addEventListener("click", () => {

    if (cartData.length === 0) {

      alert("Your shopping bag is empty.");

      return;

    }

    alert(
      "Online checkout is not connected yet. Please use the WhatsApp order option."
    );

  });

}


/* MOBILE MENU */

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    menuBtn.classList.toggle("active");

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

      menuBtn.classList.remove("active");

    });

  });

}


/* DISCOUNT POPUP */

function closeDiscount() {

  discountOverlay.classList.remove("active");

  localStorage.setItem("slinevision-popup-seen", "true");

}

if (discountClose) {

  discountClose.addEventListener("click", closeDiscount);

}

if (discountOverlay) {

  discountOverlay.addEventListener("click", event => {

    if (event.target === discountOverlay) {
      closeDiscount();
    }

  });

}


/* DISCOUNT FORM */

if (discountForm) {

  discountForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = discountEmail.value.trim();

    if (!email) return;

    discountMessage.textContent =
      "Thanks for joining SLINEVISION! Connect an email service to save subscriptions.";

  });

}


/* SHOW POPUP ON FIRST VISIT */

window.addEventListener("load", () => {

  if (
    discountOverlay &&
    !localStorage.getItem("slinevision-popup-seen")
  ) {

    setTimeout(() => {

      discountOverlay.classList.add("active");

    }, 2500);

  }

});


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeProductModal();

    closeCart();

    if (discountOverlay) {
      discountOverlay.classList.remove("active");
    }

  }

});


/* INITIALIZE WEBSITE */

renderProducts();

renderCart();
