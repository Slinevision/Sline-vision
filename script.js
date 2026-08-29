/* =================================
   SLINEVISION STORE JAVASCRIPT
================================= */


/* =================================
   PRODUCT DATA
================================= */

const products = [

    {
        name: "Tracksuit",
        price: 450,
        image: "IMG-20260725-WA0066.jpg"
    },

    {
        name: "T-Shirt",
        price: 250,
        image: "IMG-20260725-WA0068.jpg"
    },

    {
        name: "Hoodie",
        price: 350,
        image: "IMG-20260725-WA0071.jpg"
    },

    {
        name: "Zip Up",
        price: 450,
        image: "IMG-20260727-WA0105.jpg"
    },

    {
        name: "Star Trail",
        price: 400,
        image: "IMG-20260727-WA0107.jpg"
    },

    {
        name: "Pixel Motion Tee",
        price: 250,
        image: "IMG-20260725-WA0073.jpg"
    },

    {
        name: "VE.Shadow Set",
        price: 450,
        image: "IMG-20260814-WA0026.jpg"
    },

    {
        name: "Pink Galaxy Set",
        price: 800,
        image: "IMG-20260815-WA0046.jpg"
    },

    {
        name: "Galaxy Drift Set",
        price: 800,
        image: "IMG-20260815-WA0045.jpg"
    },

    {
        name: "Untamed Tee",
        price: 200,
        image: "IMG-20260727-WA0101.jpg"
    },

    {
        name: "Celestial Gallop Tee",
        price: 280,
        image: "IMG-20260727-WA0104.jpg"
    },

    {
        name: "Untamed Motion Set",
        price: 450,
        image: "IMG-20260727-WA0111.jpg"
    },

    {
        name: "Windbreaker",
        price: 480,
        image: "windbreaker.jpg"
    },

    {
        name: "Tracksuit Pants",
        price: 300,
        image: "tracksuit-pants.jpg"
    },

    {
        name: "Sports Shirt",
        price: 270,
        image: "sports-shirt.jpg"
    },

    {
        name: "Sports Shorts",
        price: 230,
        image: "sports-shorts.jpg"
    },

    {
        name: "Backpack",
        price: 350,
        image: "backpack.jpg"
    },

    {
        name: "Socks",
        price: 100,
        image: "socks.jpg"
    },

    {
        name: "Bucket Hat",
        price: 180,
        image: "bucket-hat.jpg"
    },

    {
        name: "Tracksuit Set",
        price: 500,
        image: "tracksuit-set.jpg"
    }

];


/* =================================
   CART
================================= */

let cart = [];

try {

    cart =
        JSON.parse(
            localStorage.getItem("slinevision_cart")
        ) || [];

} catch (error) {

    cart = [];

}


/* =================================
   CURRENT PRODUCT
================================= */

let currentProduct = null;
let selectedSize = "";
let selectedColor = "";


/* =================================
   SAVE CART
================================= */

function saveCart() {

    localStorage.setItem(
        "slinevision_cart",
        JSON.stringify(cart)
    );

    displayCart();

}


/* =================================
   OPEN PRODUCT
================================= */

function openProduct(index) {

    const product = products[index];

    if (!product) return;

    currentProduct = product;

    selectedSize = "";
    selectedColor = "";

    document.getElementById("modal-image").src =
        product.image;

    document.getElementById("modal-name").innerText =
        product.name;

    document.getElementById("modal-price").innerText =
        "R" + product.price.toFixed(2);

    document.getElementById("selected-size").innerText =
        "Select size";

    document.getElementById("selected-color").innerText =
        "Select colour";


    document
        .querySelectorAll(".size-options button")
        .forEach(button => {

            button.classList.remove("selected");

        });


    document
        .querySelectorAll(".color")
        .forEach(button => {

            button.classList.remove("selected");

        });


    document
        .getElementById("product-modal")
        .classList.add("active");


    document.body.style.overflow = "hidden";

}


/* =================================
   CLOSE PRODUCT
================================= */

function closeProduct() {

    document
        .getElementById("product-modal")
        .classList.remove("active");

    if (
        !document
            .getElementById("cart-drawer")
            .classList.contains("active") &&
        !document
            .getElementById("checkout-section")
            .classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


/* =================================
   SELECT SIZE
================================= */

function selectSize(button, size) {

    selectedSize = size;

    document
        .querySelectorAll(".size-options button")
        .forEach(item => {

            item.classList.remove("selected");

        });

    button.classList.add("selected");

    document.getElementById("selected-size").innerText =
        size;

}


/* =================================
   SELECT COLOUR
================================= */

function selectColor(button, color) {

    selectedColor = color;

    document
        .querySelectorAll(".color")
        .forEach(item => {

            item.classList.remove("selected");

        });

    button.classList.add("selected");

    document.getElementById("selected-color").innerText =
        color;

}


/* =================================
   ADD SELECTED PRODUCT
================================= */

function addSelectedProduct() {

    if (!currentProduct) return;


    if (!selectedSize) {

        alert("Please select a size.");

        return;

    }


    if (!selectedColor) {

        alert("Please select a colour.");

        return;

    }


    const existing =
        cart.find(item =>
            item.name === currentProduct.name &&
            item.size === selectedSize &&
            item.color === selectedColor
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: currentProduct.name,

            price: Number(currentProduct.price),

            image: currentProduct.image,

            size: selectedSize,

            color: selectedColor,

            quantity: 1

        });

    }


    saveCart();

    closeProduct();

    openCart();

}


/* =================================
   OPEN CART
================================= */

function openCart() {

    displayCart();

    document
        .getElementById("cart-drawer")
        .classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    document
        .getElementById("cart-drawer")
        .classList.remove("active");

    if (
        !document
            .getElementById("checkout-section")
            .classList.contains("active")
    ) {

        document.body.style.overflow = "";

    }

}


/* =================================
   DISPLAY CART
================================= */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    const countElement =
        document.getElementById("cart-count");

    const totalElement =
        document.getElementById("cart-total");


    container.innerHTML = "";


    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛍️
                </div>

                <h3>Your bag is empty</h3>

                <p>
                    Add something from the collection
                    to get started.
                </p>

            </div>

        `;

        countElement.innerText = "0";

        totalElement.innerText = "R0.00";

        updateCheckoutSummary();

        return;

    }


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
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                    >

                </div>

                <div class="cart-item-info">

                    <div class="cart-item-name">
                        ${escapeHTML(item.name)}
                    </div>

                    <div class="cart-item-options">

                        Size: ${escapeHTML(item.size || "N/A")}
                        <br>

                        Colour: ${escapeHTML(item.color || "N/A")}

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

                    <button
                        class="remove-item"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    countElement.innerText = count;

    totalElement.innerText =
        "R" + total.toFixed(2);


    updateCheckoutSummary();

}


/* =================================
   INCREASE QUANTITY
================================= */

function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    saveCart();

}


/* =================================
   DECREASE QUANTITY
================================= */

function decreaseQuantity(index) {

    if (!cart[index]) return;


    const quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

}


/* =================================
   REMOVE ITEM
================================= */

function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

}


/* =================================
   SEARCH
================================= */

function searchProducts() {

    const input =
        document
            .getElementById("search")
            .value
            .toLowerCase()
            .trim();


    const productCards =
        document.querySelectorAll(".product");


    const clearButton =
        document.getElementById("clear-search");


    let visible = 0;


    if (input.length > 0) {

        clearButton.style.display = "block";

    } else {

        clearButton.style.display = "none";

    }


    productCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();


        if (name.includes(input)) {

            card.style.display = "";

            visible++;

        } else {

            card.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("no-results");


    if (visible === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }


    document.getElementById("product-count").innerText =
        visible + " items";

}


/* =================================
   CLEAR SEARCH
================================= */

function clearSearch() {

    const search =
        document.getElementById("search");

    search.value = "";

    searchProducts();

    search.focus();

}


/* =================================
   SEARCH ICON
================================= */

function focusSearch() {

    const search =
        document.getElementById("search");

    search.focus();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =================================
   CHECKOUT
================================= */

function continueToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty. Please add an item first."
        );

        return;

    }


    closeCart();

    updateCheckoutSummary();


    document
        .getElementById("checkout-section")
        .classList.add("active");


    document.body.style.overflow = "hidden";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =================================
   CLOSE CHECKOUT
================================= */

function closeCheckout() {

    document
        .getElementById("checkout-section")
        .classList.remove("active");

    document.body.style.overflow = "";

}


/* =================================
   BACK TO BAG
================================= */

function backToCart() {

    closeCheckout();

    openCart();

}


/* =================================
   CHECKOUT SUMMARY
================================= */

function updateCheckoutSummary() {

    const container =
        document.getElementById("checkout-items");

    const totalElement =
        document.getElementById("checkout-total");


    if (!container || !totalElement) return;


    container.innerHTML = "";


    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;


        total += subtotal;


        container.innerHTML += `

            <div class="checkout-summary-item">

                <span>
                    ${escapeHTML(item.name)}
                    × ${quantity}
                </span>

                <strong>
                    R${subtotal.toFixed(2)}
                </strong>

            </div>

        `;

    });


    totalElement.innerText =
        "R" + total.toFixed(2);

}


/* =================================
   WHATSAPP ORDER
================================= */

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


    let message =
        "🛍️ SLINEVISION NEW ORDER\n\n";


    message +=
        "ORDER ITEMS\n" +
        "--------------------\n";


    let total = 0;


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        const subtotal =
            price * quantity;


        total += subtotal;


        message +=
            "• " +
            item.name +
            " x" +
            quantity +
            "\n" +

            "  Size: " +
            item.size +
            "\n" +

            "  Colour: " +
            item.color +
            "\n" +

            "  R" +
            subtotal.toFixed(2) +
            "\n\n";

    });


    message +=
        "TOTAL: R" +
        total.toFixed(2) +
        "\n\n";


    message +=
        "PAYMENT METHOD\n" +
        payment +
        "\n\n";


    message +=
        "CUSTOMER DETAILS\n" +
        "Name: " +
        name +
        "\n" +

        "Phone: " +
        phone +
        "\n" +

        "Address: " +
        address;


    /*
       YOUR SLINEVISION WHATSAPP NUMBER
       South African international format.
    */

    const whatsappNumber =
        "27691603308";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href = url;

}


/* =================================
   WISHLIST HEART
================================= */

function toggleWishlist(event, button) {

    event.stopPropagation();

    button.classList.toggle("liked");

    if (button.classList.contains("liked")) {

        button.innerText = "♥";

    } else {

        button.innerText = "♡";

    }

}


/* =================================
   ESCAPE HTML
================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =================================
   ESC KEY
================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProduct();

        closeCart();

        closeCheckout();

    }

});


/* =================================
   INITIALIZE
================================= */

document.addEventListener("DOMContentLoaded", function() {

    displayCart();

    const productCount =
        document.querySelectorAll(".product").length;

    document.getElementById("product-count").innerText =
        productCount + " items";

});
