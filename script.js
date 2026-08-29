/* =====================================================
   SLINEVISION STORE JAVASCRIPT
===================================================== */


/* =====================================================
   CART
===================================================== */

let cart = JSON.parse(localStorage.getItem("slinevision_cart")) || [];


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "slinevision_cart",
        JSON.stringify(cart)
    );

    displayCart();
}


/* =====================================================
   SELECT SIZE
===================================================== */

function selectSize(button) {

    const sizesContainer = button.parentElement;

    const buttons =
        sizesContainer.querySelectorAll("button");

    buttons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}


/* =====================================================
   GET SELECTED SIZE
===================================================== */

function getSelectedSize(productElement) {

    const selected =
        productElement.querySelector(".sizes button.selected");

    if (selected) {
        return selected.innerText.trim();
    }

    return null;
}


/* =====================================================
   ADD PRODUCT
===================================================== */

function addProduct(button, name, price) {

    const product =
        button.closest(".product");

    const size =
        getSelectedSize(product);


    if (!size) {

        alert("Please select a size first.");

        return;
    }


    const existing =
        cart.find(function(item) {

            return (
                item.name === name &&
                item.size === size
            );

        });


    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            name: name,

            price: Number(price),

            size: size,

            quantity: 1

        });

    }


    saveCart();

    showAddedMessage(button);

    setTimeout(function() {

        scrollToCart();

    }, 250);
}


/* =====================================================
   ADD TO BAG MESSAGE
===================================================== */

function showAddedMessage(button) {

    const original =
        button.innerText;

    button.innerText =
        "✓ ADDED";

    button.classList.add("added");


    setTimeout(function() {

        button.innerText =
            original;

        button.classList.remove("added");

    }, 1000);
}


/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");

    const countElement =
        document.getElementById("cart-count");

    const bagCount =
        document.getElementById("bag-count");

    const checkoutTotal =
        document.getElementById("checkout-total");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div class="empty-icon">
                    🛍️
                </div>

                <h3>
                    Your bag is empty
                </h3>

                <p>
                    Add something you love to your bag.
                </p>

                <a href="#products">
                    CONTINUE SHOPPING
                </a>

            </div>

        `;

        totalElement.innerText =
            "R0.00";

        countElement.innerText =
            "0";

        bagCount.innerText =
            "0 ITEMS";

        if (checkoutTotal) {
            checkoutTotal.innerText =
                "R0.00";
        }

        return;
    }


    cart.forEach(function(item, index) {

        const quantity =
            item.quantity || 1;

        const price =
            Number(item.price);

        const subtotal =
            price * quantity;


        total += subtotal;

        count += quantity;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-details">

                    <div class="cart-item-name">
                        ${escapeHTML(item.name)}
                    </div>

                    <div class="cart-item-size">
                        SIZE: ${escapeHTML(item.size)}
                    </div>

                    <div class="cart-item-price">
                        R${price.toFixed(2)}
                    </div>

                    <div class="cart-item-subtotal">
                        SUBTOTAL: R${subtotal.toFixed(2)}
                    </div>

                </div>


                <div class="cart-item-actions">

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
                        class="remove-button"
                        onclick="removeItem(${index})">

                        REMOVE

                    </button>

                </div>

            </div>

        `;

    });


    totalElement.innerText =
        "R" + total.toFixed(2);


    countElement.innerText =
        count;


    bagCount.innerText =
        count +
        (count === 1 ? " ITEM" : " ITEMS");


    if (checkoutTotal) {

        checkoutTotal.innerText =
            "R" + total.toFixed(2);

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
   SEARCH
===================================================== */

function searchProducts() {

    const input =
        document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();


    const products =
        document.querySelectorAll(".product");


    let visibleProducts = 0;


    products.forEach(function(product) {

        const name =
            product.dataset.name
            .toLowerCase();


        if (name.includes(input)) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display =
                "none";

        }

    });


    const noResults =
        document.getElementById("no-results");


    const productCount =
        document.getElementById("product-count");


    if (visibleProducts === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }


    if (input === "") {

        productCount.innerText =
            "20 PRODUCTS";

    } else {

        productCount.innerText =
            visibleProducts +
            (visibleProducts === 1
                ? " PRODUCT"
                : " PRODUCTS");

    }
}


/* =====================================================
   FOCUS SEARCH
===================================================== */

function focusSearch() {

    const search =
        document.getElementById("search");

    search.focus();

    search.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* =====================================================
   SCROLL TO CART
===================================================== */

function scrollToCart() {

    const cartSection =
        document.getElementById("cart-section");

    cartSection.scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================================
   CHECKOUT
===================================================== */

function continueToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty. Please add a product first."
        );

        return;
    }


    const checkout =
        document.getElementById(
            "checkout-section"
        );


    checkout.style.display =
        "block";


    displayCart();


    setTimeout(function() {

        checkout.scrollIntoView({
            behavior: "smooth"
        });

    }, 100);
}


/* =====================================================
   BACK TO CART
===================================================== */

function backToCart() {

    const checkout =
        document.getElementById(
            "checkout-section"
        );


    checkout.style.display =
        "none";


    scrollToCart();
}


/* =====================================================
   WHATSAPP ORDER
===================================================== */

function placeOrderOnWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty."
        );

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


    cart.forEach(function(item) {

        const quantity =
            item.quantity || 1;

        const subtotal =
            Number(item.price) * quantity;


        total += subtotal;


        items +=
            "• " +
            item.name +
            " | Size: " +
            item.size +
            " | Qty: " +
            quantity +
            " | R" +
            subtotal.toFixed(2) +
            "\n";

    });


    const delivery =
        total >= 1000
            ? "FREE"
            : "Calculated separately";


    const message =

        "🛍️ SLINEVISION NEW ORDER\n\n" +

        "ORDER ITEMS\n" +
        "--------------------\n" +

        items +

        "\nSUBTOTAL: R" +
        total.toFixed(2) +

        "\nDELIVERY: " +
        delivery +

        "\n\nPAYMENT METHOD\n" +
        payment +

        "\n\nCUSTOMER DETAILS\n" +
        "--------------------\n" +

        "Name: " +
        name +

        "\nPhone: " +
        phone +

        "\nAddress: " +
        address +

        "\n\nThank you for shopping with SLINEVISION.";


    /*
       Your WhatsApp number.
       Keep the country code and do NOT use +.
    */

    const whatsappNumber =
        "27691603308";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href =
        url;
}


/* =====================================================
   HEART / WISHLIST BUTTON
===================================================== */

function toggleHeart(button) {

    button.classList.toggle("liked");


    if (button.classList.contains("liked")) {

        button.innerText = "♥";

    } else {

        button.innerText = "♡";

    }
}


/* =====================================================
   HTML SAFETY
===================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


/* =====================================================
   START STORE
===================================================== */

displayCart();
