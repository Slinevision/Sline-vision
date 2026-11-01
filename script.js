/* SLINEVISION storefront — static GitHub Pages version */

const products = [
  {
    id: 1,
    name: "VISION CORE TEE",
    category: "T-Shirts",
    gender: "Men",
    price: 450,
    oldPrice: null,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "A clean everyday streetwear essential with the SLINEVISION identity."
  },
  {
    id: 2,
    name: "SHADOW OVERSIZED TEE",
    category: "T-Shirts",
    gender: "Unisex",
    price: 480,
    oldPrice: null,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    description: "An oversized silhouette designed for a relaxed streetwear fit."
  },
  {
    id: 3,
    name: "VISION HOODIE",
    category: "Hoodies",
    gender: "Unisex",
    price: 850,
    oldPrice: null,
    tag: "",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    description: "A heavyweight hoodie with a minimal SLINEVISION aesthetic."
  },
  {
    id: 4,
    name: "LEGACY HOODIE",
    category: "Hoodies",
    gender: "Men",
    price: 900,
    oldPrice: null,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85",
    description: "A premium streetwear hoodie built for everyday wear."
  },
  {
    id: 5,
    name: "SHADOW SET",
    category: "Sets",
    gender: "Women",
    price: 990,
    oldPrice: 1100,
    tag: "SALE",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    description: "A matching streetwear set with a bold monochrome aesthetic."
  },
  {
    id: 6,
    name: "ICON SET",
    category: "Sets",
    gender: "Unisex",
    price: 1200,
    oldPrice: null,
    tag: "",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=85",
    description: "A complete look designed around the SLINEVISION identity."
  },
  {
    id: 7,
    name: "VISION CAP",
    category: "Accessories",
    gender: "Unisex",
    price: 350,
    oldPrice: null,
    tag: "",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    description: "A minimal everyday cap finished with a clean streetwear look."
  },
  {
    id: 8,
    name: "SIGNATURE BAG",
    category: "Accessories",
    gender: "Unisex",
    price: 500,
    oldPrice: null,
    tag: "",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    description: "A compact everyday bag for the SLINEVISION lifestyle."
  }
];

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const money = amount =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(amount).replace(/\s/g, "");

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("slinevisionCart") || "[]");
} catch {
  cart = [];
}

let currentFilter = "All";
let currentGender = "All";
let currentSearch = "";
let selectedProduct = null;
let selectedSize = "M";

const productsGrid = $("#productsGrid");
const noProducts = $("#noProducts");

const cartElement = $("#cart");
const cartItems = $("#cartItems");
const cartEmpty = $("#cartEmpty");

const cartTotal = $("#cartTotal");
const cartCount = $("#cartCount");

const overlay = $("#overlay");
const productModal = $("#productModal");

const modalImage = $("#modalImage");
const modalName = $("#modalName");
const modalPrice = $("#modalPrice");
const modalCategory = $("#modalCategory");
const modalDescription = $("#modalDescription");


/* DISPLAY PRODUCTS */

function renderProducts() {
  const query = currentSearch.trim().toLowerCase();

  const filtered = products.filter(product => {

    const categoryMatch =
      currentFilter === "All" ||
      (
        currentFilter === "Sale"
          ? product.oldPrice
          : product.category === currentFilter
      );

    const genderMatch =
      currentGender === "All" ||
      product.gender === currentGender ||
      product.gender === "Unisex";

    const searchMatch = [
      product.name,
      product.category,
      product.gender
    ].join(" ").toLowerCase().includes(query);

    return categoryMatch && genderMatch && searchMatch;
  });

  productsGrid.innerHTML = "";

  noProducts.style.display =
    filtered.length ? "none" : "block";

  filtered.forEach(product => {

    const card = document.createElement("article");
    card.className = "product-card";

    const tag =
      product.tag || (product.oldPrice ? "SALE" : "");

    card.innerHTML = `
      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
        >

        ${tag ? `<span class="product-tag">${tag}</span>` : ""}

        <button class="quick-add" type="button">
          QUICK ADD ＋
        </button>

      </div>

      <div class="product-info">

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-category">
          ${product.category} · ${product.gender}
        </div>

        <div class="product-price">
          ${
            product.oldPrice
              ? `<del>${money(product.oldPrice)}</del>
                 <span class="sale-price">${money(product.price)}</span>`
              : money(product.price)
          }
        </div>

      </div>
    `;

    card.addEventListener("click", () => {
      openProduct(product);
    });

    $(".quick-add", card).addEventListener("click", event => {
      event.stopPropagation();
      openProduct(product);
    });

    productsGrid.appendChild(card);
  });
}


/* PRODUCT FILTERS */

function setActiveFilter(value) {

  currentFilter = value;

  $$(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.filter === value
    );
  });

  renderProducts();
}


/* PRODUCT DETAILS */

function openProduct(product) {

  selectedProduct = product;
  selectedSize = "M";

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalName.textContent = product.name;
  modalPrice.textContent = money(product.price);

  modalCategory.textContent =
    `${product.category} / ${product.gender}`;

  modalDescription.textContent =
    product.description;

  $$(".sizes button").forEach(button => {
    button.classList.toggle(
      "selected",
      button.textContent.trim() === "M"
    );
  });

  productModal.classList.add("show");

  productModal.setAttribute("aria-hidden", "false");
}


function closeProduct() {

  productModal.classList.remove("show");

  productModal.setAttribute("aria-hidden", "true");
}


/* SHOPPING CART */

function saveCart() {

  localStorage.setItem(
    "slinevisionCart",
    JSON.stringify(cart)
  );

  renderCart();
}


function addToCart(product, size = "M") {

  const existing = cart.find(item =>
    item.id === product.id &&
    item.size === size
  );

  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      quantity: 1
    });

  }

  saveCart();

  closeProduct();

  openCart();
}


function renderCart() {

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {

    total += item.price * item.quantity;
    count += item.quantity;

    const row = document.createElement("div");

    row.className = "cart-item";

    row.innerHTML = `
      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <div class="cart-item-name">
          ${item.name}
        </div>

        <div class="cart-item-price">
          SIZE: ${item.size}<br>
          ${money(item.price)} × ${item.quantity}
        </div>

      </div>

      <button
        class="remove-item"
        type="button"
        data-index="${index}"
      >
        REMOVE
      </button>
    `;

    $(".remove-item", row).addEventListener("click", () => {

      cart.splice(index, 1);

      saveCart();

    });

    cartItems.appendChild(row);

  });

  cartTotal.textContent = money(total);
  cartCount.textContent = count;

  $("#cartCountHeading").textContent = count;

  cartEmpty.style.display =
    cart.length ? "none" : "block";
}


function openCart() {

  cartElement.classList.add("open");

  overlay.classList.add("show");

}


function closeCart() {

  cartElement.classList.remove("open");

  overlay.classList.remove("show");

}


function closeAll() {

  closeProduct();

  closeCart();

  $("#discountOverlay").classList.remove("show");

}


/* FILTER BUTTONS */

$$(".filter").forEach(button => {

  button.addEventListener("click", () => {

    setActiveFilter(button.dataset.filter);

  });

});


/* CATEGORY LINKS */

$$("[data-category-link]").forEach(link => {

  link.addEventListener("click", () => {

    const category = link.dataset.categoryLink;

    currentGender = "All";

    setActiveFilter(
      category === "Sale" ? "Sale" : category
    );

    $("#nav").classList.remove("open");

  });

});


/* MEN AND WOMEN FILTERS */

$$("[data-gender-link]").forEach(link => {

  link.addEventListener("click", () => {

    currentGender = link.dataset.genderLink;

    setActiveFilter("All");

    $("#nav").classList.remove("open");

  });

});


/* SEARCH */

$("#searchBtn").addEventListener("click", () => {

  $("#searchPanel").classList.toggle("show");

  if ($("#searchPanel").classList.contains("show")) {

    $("#searchInput").focus();

  }

});


$("#searchInput").addEventListener("input", event => {

  currentSearch = event.target.value;

  renderProducts();

});


/* MOBILE MENU */

$("#menuBtn").addEventListener("click", () => {

  $("#nav").classList.toggle("open");

});


/* CART BUTTONS */

$("#cartBtn").addEventListener("click", openCart);

$("#cartClose").addEventListener("click", closeCart);

overlay.addEventListener("click", closeCart);


/* PRODUCT MODAL BUTTONS */

$("#modalClose").addEventListener("click", closeProduct);

productModal.addEventListener("click", event => {

  if (event.target === productModal) {

    closeProduct();

  }

});


/* SIZE SELECTION */

$$(".sizes button").forEach(button => {

  button.addEventListener("click", () => {

    $$(".sizes button").forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedSize = button.textContent.trim();

  });

});


/* ADD TO BAG */

$("#modalAdd").addEventListener("click", () => {

  if (selectedProduct) {

    addToCart(selectedProduct, selectedSize);

  }

});


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeAll();

  }

});


/* WHATSAPP ORDERING */

$("#whatsappBtn").addEventListener("click", () => {

  if (!cart.length) {

    alert("Your bag is empty.");

    return;

  }

  // REPLACE THIS WITH YOUR OWN WHATSAPP NUMBER.
  const phone = "27821234567";

  const lines = cart.map(item =>
    `${item.name} — Size ${item.size} — ${item.quantity}x — ${money(item.price * item.quantity)}`
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = encodeURIComponent(
    `Hi SLINEVISION! I would like to order:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}`
  );

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank",
    "noopener"
  );

});


/* CHECKOUT */

$("#checkoutBtn").addEventListener("click", () => {

  alert(
    "Your bag is ready. Connect a payment provider to enable secure online checkout."
  );

});


/* WELCOME DISCOUNT POPUP */

const discountOverlay = $("#discountOverlay");


$("#discountClose").addEventListener("click", () => {

  discountOverlay.classList.remove("show");

});


discountOverlay.addEventListener("click", event => {

  if (event.target === discountOverlay) {

    discountOverlay.classList.remove("show");

  }

});


$("#discountForm").addEventListener("submit", event => {

  event.preventDefault();

  const email = $("#discountEmail").value.trim();

  if (!email) return;

  // DEMO ONLY: This saves the email in this browser.
  // It does not send it to an email marketing service.

  localStorage.setItem(
    "slinevisionDiscountEmail",
    email
  );

  localStorage.setItem(
    "slinevisionDiscountClaimed",
    "true"
  );

  $("#discountMessage").textContent =
    "Your 10% offer is ready. Thanks for joining!";

  $("#discountForm button").textContent =
    "OFFER CLAIMED ✓";

  setTimeout(() => {

    discountOverlay.classList.remove("show");

  }, 1800);

});


/* START WEBSITE */

renderProducts();

renderCart();


// Show welcome offer once per browser session.
if (
  !localStorage.getItem("slinevisionDiscountClaimed") &&
  !sessionStorage.getItem("slinevisionPopupSeen")
) {

  sessionStorage.setItem(
    "slinevisionPopupSeen",
    "true"
  );

  setTimeout(() => {

    discountOverlay.classList.add("show");

  }, 7000);

}
