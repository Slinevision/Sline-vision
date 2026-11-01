
/* SLINEVISION — Website functionality */

const products = [
  {
    id: 1,
    name: "VOID CIRCLE",
    category: "T-Shirts",
    gender: "Men",
    price: 450,
    oldPrice: null,
    tag: "NEW",
    image: "IMG-20260725-WA0068.jpg",
    description: "A clean everyday streetwear essential with the SLINEVISION identity."
  },
  {
    id: 2,
    name: "GHOST PHASE",
    category: "T-Shirts",
    gender: "Men",
    price: 480,
    oldPrice: null,
    tag: "BESTSELLER",
    image: "IMG-20260725-WA0073.jpg",
    description: "An oversized silhouette designed for a relaxed streetwear fit."
  },
  {
    id: 3,
    name: "PLAID GHOST",
    category: "Hoodies",
    gender: "Unisex",
    price: 850,
    oldPrice: null,
    tag: "POPULAR",
    image: "IMG-20260727-WA0105.jpg",
    description: "A heavyweight hoodie with a minimal SLINEVISION aesthetic."
  },
  {
    id: 4,
    name: "NOVA STAMPEDE",
    category: "T-Shirts",
    gender: "Men",
    price: 450,
    oldPrice: null,
    tag: "NEW",
    image: "IMG-20260727-WA0104.jpg",
    description: "A premium streetwear hoodie built for everyday wear."
  },
  {
    id: 5,
    name: "VE. SWEAT SET",
    category: "SWEATSUIT",
    gender: "Women",
    price: 990,
    oldPrice: 1100,
    tag: "SALE",
    image: "IMG-20260814-WA0026.jpg",
    description: "A coordinated track suit with a relaxed streetwear fit."
  },
  {
    id: 6,
    name: "DUAL STAMPEDE TUBE",
    category: "SWEATSUIT",
    gender: "Girl",
    price: 990,
    oldPrice: null,
    tag: "NEW",
    image: "IMG-20260727-WA0111.jpg",
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
    description: "A clean tapered sweat pant with a comfortable relaxed fit."
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const money = amount =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(amount).replace(/\s/g, "");

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("slinevisionCart") || "[]");
  if (!Array.isArray(cart)) cart = [];
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
const discountOverlay = $("#discountOverlay");

/* DISPLAY PRODUCTS */

function renderProducts() {
  const query = currentSearch.trim().toLowerCase();

  const filtered = products.filter(product => {
    const categoryMatch =
      currentFilter === "All" ||
      (currentFilter === "Sale"
        ? Boolean(product.oldPrice)
        : product.category === currentFilter);

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

  noProducts.style.display = filtered.length ? "none" : "block";

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const tag = product.tag || (product.oldPrice ? "SALE" : "");

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">

        ${tag ? `<span class="product-tag">${tag}</span>` : ""}

        <button class="quick-add" type="button">
          QUICK ADD ＋
        </button>
      </div>

      <div class="product-info">
        <div class="product-name">${product.name}</div>

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

    card.addEventListener("click", () => openProduct(product));

    $(".quick-add", card).addEventListener("click", event => {
      event.stopPropagation();
      openProduct(product);
    });

    productsGrid.appendChild(card);
  });
}

/* CATEGORY FILTERS */

function setActiveFilter(value) {
  currentFilter = value;
  currentGender = "All";

  $$(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === value);
  });

  renderProducts();
}

$$(".filter").forEach(button => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

$$("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    const category = link.dataset.categoryLink;
    setActiveFilter(category || "All");
    $("#nav").classList.remove("open");
  });
});

/* SEARCH */

$$("[data-search]").forEach(button => {
  button.addEventListener("click", () => {
    $("#searchInput").value = button.dataset.search;
    currentSearch = button.dataset.search;
    renderProducts();
    $("#products").scrollIntoView({ behavior: "smooth" });
  });
});

$("#searchBtn").addEventListener("click", () => {
  $("#searchInput").focus();
  $(".search-area").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

$("#searchSubmit").addEventListener("click", () => {
  $("#products").scrollIntoView({ behavior: "smooth" });
  renderProducts();
});

$("#searchInput").addEventListener("input", event => {
  currentSearch = event.target.value;
  renderProducts();
});

/* MOBILE MENU */

$("#menuBtn").addEventListener("click", () => {
  $("#nav").classList.toggle("open");
});

$("#nav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    $("#nav").classList.remove("open");
  });
});

/* PRODUCT DETAILS */

function openProduct(product) {
  selectedProduct = product;
  selectedSize = "M";

  $("#modalImage").src = product.image;
  $("#modalImage").alt = product.name;
  $("#modalName").textContent = product.name;
  $("#modalPrice").textContent = money(product.price);

  $("#modalCategory").textContent =
    `${product.category} / ${product.gender}`;

  $("#modalDescription").textContent = product.description;

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

$("#modalClose").addEventListener("click", closeProduct);

productModal.addEventListener("click", event => {
  if (event.target === productModal) closeProduct();
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

/* SHOPPING BAG */

function saveCart() {
  localStorage.setItem("slinevisionCart", JSON.stringify(cart));
  renderCart();
}

function addToCart(product, size = "M") {
  const existing = cart.find(item =>
    item.id === product.id && item.size === size
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
      <img src="${item.image}" alt="${item.name}">

      <div>
        <div class="cart-item-name">${item.name}</div>

        <div class="cart-item-price">
          SIZE: ${item.size}<br>
          ${money(item.price)} × ${item.quantity}
        </div>
      </div>

      <button class="remove-item" type="button">
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

  cartEmpty.style.display = cart.length ? "none" : "block";
}

function openCart() {
  cartElement.classList.add("open");
  overlay.classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  cartElement.classList.remove("open");
  overlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

$("#modalAdd").addEventListener("click", () => {
  if (selectedProduct) {
    addToCart(selectedProduct, selectedSize);
  }
});

$("#cartBtn").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

/* WHATSAPP ORDER */

$("#whatsappBtn").addEventListener("click", () => {
  if (!cart.length) {
    alert("Your bag is empty.");
    return;
  }

  // REPLACE THIS WITH YOUR OWN WHATSAPP NUMBER.
  // Include the country code, without the plus sign.
  const phone = "27691603308";

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
    "Online payment checkout is not connected yet. Please use the WhatsApp order option."
  );
});

/* CUSTOMER ACCOUNT */

$("#accountBtn").addEventListener("click", () => {
  alert(
    "Customer accounts are not connected yet. Contact SLINEVISION to place an order."
  );
});

/* DISCOUNT POPUP */

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

  localStorage.setItem("slinevisionDiscountEmail", email);
  localStorage.setItem("slinevisionDiscountClaimed", "true");

  $("#discountMessage").textContent =
    "Thanks for joining SLINEVISION!";

  $("#discountForm button").textContent = "JOINED ✓";

  setTimeout(() => {
    discountOverlay.classList.remove("show");
  }, 1600);
});

/* CLOSE POPUPS WITH ESCAPE */

function closeAll() {
  closeProduct();
  closeCart();
  discountOverlay.classList.remove("show");
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeAll();
  }
});

/* START WEBSITE */

renderProducts();
renderCart();

/* SHOW WELCOME POPUP */

if (
  !localStorage.getItem("slinevisionDiscountClaimed") &&
  !sessionStorage.getItem("slinevisionPopupSeen")
) {
  sessionStorage.setItem("slinevisionPopupSeen", "true");

  setTimeout(() => {
    discountOverlay.classList.add("show");
  }, 9000);
}
