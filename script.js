/* =====================================================
   SLINEVISION - SCRIPT.JS
   Size selection only
   ===================================================== */


/* =========================
   PRODUCT DATA
========================= */

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


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   CURRENT PRODUCT
========================= */

let currentProduct = null;
let selectedSize = "";


/* =========================
   OPEN PRODUCT
========================= */

function openProduct(index) {

    if (!products[index]) {
        return;
    }

    currentProduct = products[index];

    selectedSize = "";

    document.getElementById("modal-image").src =
        currentProduct.image;

    document.getElementById("modal-image").alt =
        currentProduct.name;

    document.getElementById("modal-name").innerText =
        currentProduct.name;

    document.getElementById("modal-price").innerText =
        "R" + currentProduct.price.toFixed(2);

    document.getElementById("selected-size").innerText =
        "Select size";


    /* Remove old selected size */

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


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {

    document
        .getElementById("product-modal")
        .classList.remove("active");

    document.body.classList.remove("modal-open");

    currentProduct = null;
    selectedSize = "";
}


/* =========================
   SELECT SIZE
========================= */

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


/* =========================
   ADD SELECTED PRODUCT
========================= */

function addSelectedProduct() {

    if (!currentProduct) {
        return;
    }


    if (!selectedSize) {

        alert("Please select a size first.");

        return;
    }


    let existing = cart.find(item =>
        item.name === currentProduct.name &&
        item.size === selectedSize
    );


    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            name: currentProduct.name,

            price: Number(currentProduct.price),

            image: currentProduct.image,

            size: selectedSize,

            quantity: 1

        });

    }


    saveCart();

    closeProduct();

    openCart();

}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


/* =========================
   DISPLAY CART
========================= */

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
                <div class="empty-cart-icon">🛍️</div>
                <h3>Your bag is empty</h3>
                <p>Add something you love.</p>
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
                            src="${item.image || ''}"
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

        cartCount.innerText = count;

    }


    if (cartTotal) {

        cartTotal.innerText =
            "R" + total.toFixed(2);

    }


    updateCheckout();
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

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


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    if (!cart[index]) {
        return;
    }

    cart.splice(index, 1);

    saveCart();
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    document
        .getElementById("cart-drawer")
        .classList.add("active");

    document.body.classList.add("cart-open");

    displayCart();
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document
        .getElementById("cart-drawer")
        .classList.remove("active");

    document.body.classList.remove("cart-open");
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const input =
        document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();


    const productCards =
        document.querySelectorAll(".product");


    let visibleCount = 0;


    productCards.forEach(product => {

        const name =
            product
            .dataset
            .name
            .toLowerCase();


        if (name.includes(input)) {

            product.style.display = "";

            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });


    const noResults =
        document.getElementById("no-results");


    if (noResults) {

        noResults.style.display =
            visibleCount === 0
            ? "block"
            : "none";

    }


    const productCount =
        document.getElementById("product-count");


    if (productCount) {

        if (input) {

            productCount.innerText =
                visibleCount + " products";

        } else {

            productCount.innerText =
                products.length + " products";

        }

    }


    const clearButton =
        document.getElementById("clear-search");


    if (clearButton) {

        clearButton.style.display =
            input ? "block" : "none";

    }

}


/* =========================
   CLEAR SEARCH
========================= */

function clearSearch() {

    const search =
        document.getElementById("search");


    if (search) {

        search.value = "";

        searchProducts();

        search.focus();

    }

}


/* =========================
   FOCUS SEARCH
========================= */

function focusSearch() {

    const search =
        document.getElementById("search");


    if (!search) {
        return;
    }


    search.focus();


    search.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================
   WISHLIST
========================= */

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


/* =========================
   CHECKOUT
========================= */

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


    document.body.classList.add("checkout-open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   UPDATE CHECKOUT
========================= */

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
                        Size: ${item.size || "Not selected"}
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
            "R" + total.toFixed(2);

    }

}


/* =========================
   CLOSE CHECKOUT
========================= */

function closeCheckout() {

    document
        .getElementById("checkout-section")
        .classList.remove("active");


    document.body.classList.remove("checkout-open");

}


/* =========================
   BACK TO CART
========================= */

function backToCart() {

    closeCheckout();

    openCart();

}


/* =========================
   WHATSAPP ORDER
========================= */

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

        "🛍️ SLINEVISION NEW ORDER\n\n" +

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


    /* Your WhatsApp number */

    const whatsappNumber =
        "27691603308";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href = url;

}


/* =========================
   PRODUCT COUNT
========================= */

function updateProductCount() {

    const productCount =
        document.getElementById("product-count");


    if (productCount) {

        productCount.innerText =
            products.length + " products";

    }

}


/* =========================
   CLOSE MODALS WITH ESC
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProduct();

            closeCart();

            closeCheckout();

        }

    }
);


/* =========================
   START WEBSITE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        updateProductCount();

        searchProducts();

    }
);
