/* =====================================================
   SLINEVISION — SCRIPT.JS
   Premium Store Version 2.0
===================================================== */


/* =====================================================
   PRODUCT DATA
===================================================== */

const products = [

    {
        name: "Tracksuit",
        price: 450,
        image: "IMG-20260725-WA0066.jpg",
        category: "sets",
        badge: "NEW"
    },

    {
        name: "T-Shirt",
        price: 250,
        image: "IMG-20260725-WA0068.jpg",
        category: "tops"
    },

    {
        name: "Hoodie",
        price: 350,
        image: "IMG-20260725-WA0071.jpg",
        category: "tops"
    },

    {
        name: "Zip Up",
        price: 450,
        image: "IMG-20260727-WA0105.jpg",
        category: "tops"
    },

    {
        name: "Star Trail",
        price: 400,
        image: "IMG-20260727-WA0107.jpg",
        category: "tops"
    },

    {
        name: "Pixel Motion Tee",
        price: 250,
        image: "IMG-20260725-WA0073.jpg",
        category: "tops"
    },

    {
        name: "VE.Shadow Set",
        price: 450,
        image: "IMG-20260814-WA0026.jpg",
        category: "sets",
        badge: "NEW"
    },

    {
        name: "Pink Galaxy Set",
        price: 800,
        image: "IMG-20260815-WA0046.jpg",
        category: "sets"
    },

    {
        name: "Galaxy Drift Set",
        price: 800,
        image: "IMG-20260815-WA0045.jpg",
        category: "sets",
        badge: "SALE"
    },

    {
        name: "Untamed Tee",
        price: 200,
        image: "IMG-20260727-WA0101.jpg",
        category: "tops"
    },

    {
        name: "Celestial Gallop Tee",
        price: 280,
        image: "IMG-20260727-WA0104.jpg",
        category: "tops"
    },

    {
        name: "Untamed Motion Set",
        price: 450,
        image: "IMG-20260727-WA0111.jpg",
        category: "sets"
    },

    {
        name: "Windbreaker",
        price: 480,
        image: "windbreaker.jpg",
        category: "tops"
    },

    {
        name: "Tracksuit Pants",
        price: 300,
        image: "tracksuit-pants.jpg",
        category: "bottoms"
    },

    {
        name: "Sports Shirt",
        price: 270,
        image: "sports-shirt.jpg",
        category: "tops"
    },

    {
        name: "Sports Shorts",
        price: 230,
        image: "sports-shorts.jpg",
        category: "bottoms"
    },

    {
        name: "Backpack",
        price: 350,
        image: "backpack.jpg",
        category: "accessories"
    },

    {
        name: "Socks",
        price: 100,
        image: "socks.jpg",
        category: "accessories"
    },

    {
        name: "Bucket Hat",
        price: 180,
        image: "bucket-hat.jpg",
        category: "accessories"
    },

    {
        name: "Tracksuit Set",
        price: 500,
        image: "tracksuit-set.jpg",
        category: "sets",
        badge: "NEW"
    }

];


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =====================================================
   CURRENT PRODUCT
===================================================== */

let currentProduct = null;
let selectedSize = "";
let activeCategory = "all";


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    renderProducts(products);

    displayCart();

    updateProductCount();

    setupKeyboard();

});


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts(list) {

    const grid =
        document.getElementById("product-grid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";

    list.forEach((product, index) => {

        const card =
            document.createElement("article");

        card.className = "product";

        card.dataset.name =
            product.name.toLowerCase();

        card.dataset.category =
            product.category;

        card.innerHTML = `

            <div class="product-image"
                 onclick="openProduct(${index}, ${products.indexOf(product)})">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                    product.badge
                    ? `<span class="badge">${product.badge}</span>`
                    : ""
                }

                <button
                    class="heart"
                    onclick="toggleWishlist(event, this)"
                    aria-label="Add ${product.name} to wishlist">
                    ♡
                </button>

                <button
                    class="quick-add"
                    onclick="quickAdd(event, ${products.indexOf(product)})">
                    QUICK ADD
                </button>

            </div>


            <div class="product-info">

                <div class="product-brand">
                    SLINEVISION
                </div>

                <div class="product-name">
                    ${product.name}
                </div>

                <div class="product-bottom">

                    <div class="rating">
                        ★★★★★
                    </div>

                    <div class="price">
                        R${product.price.toFixed(2)}
                    </div>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* =====================================================
   QUICK ADD
===================================================== */

function quickAdd(event, index) {

    event.stopPropagation();

    openProduct(index);

}


/* =====================================================
   OPEN PRODUCT
===================================================== */

function openProduct(index) {

    if (!products[index]) {
        return;
    }

    currentProduct =
        products[index];

    selectedSize = "";

    const image =
        document.getElementById("modal-image");

    const name =
        document.getElementById("modal-name");

    const price =
        document.getElementById("modal-price");

    const selected =
        document.getElementById("selected-size");

    if (image) {
        image.src =
            currentProduct.image;

        image.alt =
            currentProduct.name;
    }

    if (name) {
        name.innerText =
            currentProduct.name;
    }

    if (price) {
        price.innerText =
            "R" +
            currentProduct.price.toFixed(2);
    }

    if (selected) {
        selected.innerText =
            "Required";
    }

    document
        .querySelectorAll(".size-options button")
        .forEach(button => {
            button.classList.remove("selected");
        });

    document
        .getElementById("product-modal")
        .classList.add("active");

    document.body.classList.add("modal-open");

}


/* =====================================================
   CLOSE PRODUCT
===================================================== */

function closeProduct() {

    const modal =
        document.getElementById("product-modal");

    if (modal) {
        modal.classList.remove("active");
    }

    document.body.classList.remove("modal-open");

    currentProduct = null;
    selectedSize = "";

}


/* =====================================================
   SELECT SIZE
===================================================== */

function selectSize(button, size) {

    selectedSize = size;

    document
        .querySelectorAll(".size-options button")
        .forEach(item => {
            item.classList.remove("selected");
        });

    button.classList.add("selected");

    const selected =
        document.getElementById("selected-size");

    if (selected) {
        selected.innerText =
            size;
    }

}


/* =====================================================
   ADD SELECTED PRODUCT
===================================================== */

function addSelectedProduct() {

    if (!currentProduct) {
        return;
    }

    if (!selectedSize) {

        alert("Please select a size first.");

        return;
    }

    addToCart(
        currentProduct,
        selectedSize
    );

    closeProduct();

    openCart();

}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(product, size) {

    const existing =
        cart.find(item =>
            item.name === product.name &&
            item.size === size
        );

    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            name: product.name,

            price: Number(product.price),

            image: product.image,

            size: size,

            quantity: 1

        });

    }

    saveCart();

}


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    BAG
                </div>

                <h3>
                    Your bag is empty
                </h3>

                <p>
                    Discover something new.
                </p>

            </div>

        `;

    } else {

        cart.forEach((item, index) => {

            const quantity =
                Number(item.quantity) || 1;

            const price =
                Number(item.price) || 0;

            const subtotal =
                price * quantity;

            total += subtotal;

            count += quantity;


            container.innerHTML += `

                <div class="cart-item">

                    <div class="cart-item-image">

                        <img
                            src="${item.image || ""}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="cart-item-details">

                        <div class="cart-item-name">
                            ${item.name}
                        </div>

                        <div class="cart-item-size">
                            Size: ${item.size || "Not selected"}
                        </div>

                        <div class="cart-item-price">
                            R${price.toFixed(2)}
                        </div>


                        <div class="quantity-controls">

                            <button
                                onclick="decreaseQuantity(${index})">
                                −
                            </button>

                            <span>
                                ${quantity}
                            </span>

                            <button
                                onclick="increaseQuantity(${index})">
                                +
                            </button>

                        </div>


                        <div class="cart-subtotal">
                            R${subtotal.toFixed(2)}
                        </div>


                        <button
                            class="remove-button"
                            onclick="removeItem(${index})">

                            Remove

                        </button>

                    </div>

                </div>

            `;

        });

    }


    if (cartCount) {
        cartCount.innerText =
            count;
    }

    if (cartTotal) {
        cartTotal.innerText =
            "R" +
            total.toFixed(2);
    }

    updateDeliveryProgress(total);

    updateCheckout();

}


/* =====================================================
   DELIVERY PROGRESS
===================================================== */

function updateDeliveryProgress(total) {

    const message =
        document.getElementById("delivery-message");

    const progress =
        document.getElementById("delivery-progress-bar");

    if (!message || !progress) {
        return;
    }

    const target = 1000;

    const percentage =
        Math.min(
            (total / target) * 100,
            100
        );

    progress.style.width =
        percentage + "%";


    if (total <= 0) {

        message.innerText =
            "Add items to unlock free delivery.";

    } else if (total < target) {

        const remaining =
            target - total;

        message.innerText =
            "R" +
            remaining.toFixed(2) +
            " away from FREE DELIVERY.";

    } else {

        message.innerText =
            "FREE DELIVERY unlocked.";

    }

}


/* =====================================================
   INCREASE QUANTITY
===================================================== */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();

}


/* =====================================================
   DECREASE QUANTITY
===================================================== */

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    if ((cart[index].quantity || 1) > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

}


/* =====================================================
   REMOVE ITEM
===================================================== */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart();

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const drawer =
        document.getElementById("cart-drawer");

    if (!drawer) {
        return;
    }

    drawer.classList.add("active");

    document.body.classList.add("cart-open");

    displayCart();

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const drawer =
        document.getElementById("cart-drawer");

    if (drawer) {
        drawer.classList.remove("active");
    }

    document.body.classList.remove("cart-open");

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const inputElement =
        document.getElementById("search");

    if (!inputElement) {
        return;
    }

    const input =
        inputElement.value
        .toLowerCase()
        .trim();


    let filtered =
        products.filter(product => {

            const matchesName =
                product.name
                .toLowerCase()
                .includes(input);

            const matchesCategory =
                activeCategory === "all" ||
                product.category === activeCategory;

            return matchesName &&
                   matchesCategory;

        });


    renderProducts(filtered);

    updateProductCount(filtered.length);


    const noResults =
        document.getElementById("no-results");

    if (noResults) {

        noResults.style.display =
            filtered.length === 0
            ? "block"
            : "none";

    }


    const clearButton =
        document.getElementById("clear-search");

    if (clearButton) {

        clearButton.style.display =
            input
            ? "block"
            : "none";

    }

}


/* =====================================================
   CLEAR SEARCH
===================================================== */

function clearSearch() {

    const search =
        document.getElementById("search");

    if (!search) {
        return;
    }

    search.value = "";

    searchProducts();

}


/* =====================================================
   OPEN SEARCH
===================================================== */

function openSearch() {

    const panel =
        document.getElementById("search-panel");

    if (!panel) {
        return;
    }

    panel.classList.toggle("active");

    if (panel.classList.contains("active")) {

        setTimeout(() => {

            const input =
                document.getElementById("search");

            if (input) {
                input.focus();
            }

        }, 250);

    }

}


/* =====================================================
   FOCUS SEARCH
===================================================== */

function focusSearch() {

    openSearch();

}


/* =====================================================
   FILTERS
===================================================== */

function toggleFilters() {

    const filterBar =
        document.getElementById("filter-bar");

    if (!filterBar) {
        return;
    }

    filterBar.classList.toggle("visible");

}


/* =====================================================
   FILTER PRODUCTS
===================================================== */

function filterProducts(category, button) {

    activeCategory = category;

    document
        .querySelectorAll(".filter-chip")
        .forEach(item => {
            item.classList.remove("active");
        });

    if (button) {
        button.classList.add("active");
    }

    searchProducts();

}


/* =====================================================
   PRODUCT COUNT
===================================================== */

function updateProductCount(count = products.length) {

    const productCount =
        document.getElementById("product-count");

    if (!productCount) {
        return;
    }

    productCount.innerText =
        count + " " +
        (count === 1 ? "product" : "products");

}


/* =====================================================
   WISHLIST
===================================================== */

function toggleWishlist(event, button) {

    event.stopPropagation();

    if (button.classList.contains("liked")) {

        button.classList.remove("liked");

        button.innerText = "♡";

    } else {

        button.classList.add("liked");

        button.innerText = "♥";

    }

}


/* =====================================================
   SCROLL TO PRODUCTS
===================================================== */

function scrollToProducts() {

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    const menu =
        document.getElementById("mobile-menu");

    if (!menu) {
        return;
    }

    menu.classList.toggle("active");

    document.body.classList.toggle(
        "mobile-menu-open"
    );

}


/* =====================================================
   CHECKOUT
===================================================== */

function continueToCheckout() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

        return;
    }

    closeCart();

    updateCheckout();

    document
        .getElementById("checkout-section")
        .classList.add("active");

    document.body.classList.add(
        "checkout-open"
    );

}


/* =====================================================
   UPDATE CHECKOUT
===================================================== */

function updateCheckout() {

    const checkoutItems =
        document.getElementById("checkout-items");

    const checkoutTotal =
        document.getElementById("checkout-total");

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;

        total += subtotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        Size:
                        ${item.size || "Not selected"}
                        × ${quantity}
                    </small>

                </div>

                <strong>
                    R${subtotal.toFixed(2)}
                </strong>

            </div>

        `;

    });


    if (checkoutTotal) {

        checkoutTotal.innerText =
            "R" +
            total.toFixed(2);

    }

}


/* =====================================================
   CLOSE CHECKOUT
===================================================== */

function closeCheckout() {

    const checkout =
        document.getElementById(
            "checkout-section"
        );

    if (checkout) {
        checkout.classList.remove("active");
    }

    document.body.classList.remove(
        "checkout-open"
    );

}


/* =====================================================
   BACK TO CART
===================================================== */

function backToCart() {

    closeCheckout();

    openCart();

}


/* =====================================================
   WHATSAPP ORDER
===================================================== */

function placeOrderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

        return;
    }


    const name =
        document
        .getElementById("customer-name")
        .value
        .trim();


    const phone =
        document
        .getElementById("customer-phone")
        .value
        .trim();


    const address =
        document
        .getElementById("customer-address")
        .value
        .trim();


    if (!name || !phone || !address) {

        alert(
            "Please complete your delivery details."
        );

        return;
    }


    const paymentElement =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    const payment =
        paymentElement
        ? paymentElement.value
        : "Not selected";


    let items = "";
    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;


        total += subtotal;


        items +=
            "• " +
            item.name +
            " | Size: " +
            (item.size || "Not selected") +
            " | Qty: " +
            quantity +
            " | R" +
            subtotal.toFixed(2) +
            "\n";

    });


    const message =

        "SLINEVISION NEW ORDER\n\n" +

        "ORDER ITEMS\n" +
        "--------------------\n" +

        items +

        "\nTOTAL: R" +
        total.toFixed(2) +

        "\n\nPAYMENT METHOD\n" +
        payment +

        "\n\nCUSTOMER DETAILS\n" +

        "Name: " +
        name +

        "\nPhone: " +
        phone +

        "\nAddress: " +
        address;


    const whatsappNumber =
        "27691603308";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href = url;

}


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

function setupKeyboard() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {

                closeProduct();

                closeCart();

                closeCheckout();

                const menu =
                    document.getElementById(
                        "mobile-menu"
                    );

                if (
                    menu &&
                    menu.classList.contains("active")
                ) {

                    toggleMobileMenu();

                }

            }

        }
    );

}
