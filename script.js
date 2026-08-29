/* =====================================================
   SLINEVISION SHOPPING SYSTEM
===================================================== */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =====================================================
   SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
    updateCartCount();
}


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(name, price) {

    price = Number(price);

    let existing = cart.find(
        item => item.name === name
    );


    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    saveCart();

    openCart();

}


/* =====================================================
   DISPLAY CART
===================================================== */

function displayCart() {

    const container =
        document.getElementById("cart-items");

    const totalElement =
        document.getElementById("cart-total");


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                Your bag is empty.

                <br><br>

                Add something you love.

            </div>

        `;


        if (totalElement) {
            totalElement.innerText = "R0.00";
        }

        return;
    }


    cart.forEach(function(item,index) {

        const quantity =
            item.quantity || 1;

        const price =
            Number(item.price);

        const subtotal =
            price * quantity;


        total += subtotal;


        container.innerHTML += `

            <div class="cart-item">

                <div></div>

                <div class="cart-item-info">

                    <div class="cart-item-name">

                        ${item.name}

                    </div>


                    <div class="cart-item-price">

                        R${price.toFixed(2)}

                    </div>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span class="quantity-number">

                            ${quantity}

                        </span>


                        <button
                            type="button"
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-button"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    if (totalElement) {

        totalElement.innerText =
            "R" + total.toFixed(2);

    }

}


/* =====================================================
   INCREASE
===================================================== */

function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();

}


/* =====================================================
   DECREASE
===================================================== */

function decreaseQuantity(index) {

    if (!cart[index]) return;


    if (
        (cart[index].quantity || 1) > 1
    ) {

        cart[index].quantity--;

    } else {

        cart.splice(index,1);

    }


    saveCart();

}


/* =====================================================
   REMOVE
===================================================== */

function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index,1);

    saveCart();

}


/* =====================================================
   UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const countElement =
        document.getElementById("cart-count");


    if (!countElement) return;


    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity || 1;

    });


    countElement.innerText = count;

}


/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

    const drawer =
        document.getElementById("cart-drawer");

    const overlay =
        document.getElementById("cart-overlay");


    if (drawer) {

        drawer.classList.add("open");

    }


    if (overlay) {

        overlay.classList.add("show");

    }

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const drawer =
        document.getElementById("cart-drawer");

    const overlay =
        document.getElementById("cart-overlay");


    if (drawer) {

        drawer.classList.remove("open");

    }


    if (overlay) {

        overlay.classList.remove("show");

    }

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const search =
        document
        .getElementById("search")
        .value
        .toLowerCase()
        .trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        const name =
            (
                product.dataset.name ||
                product.innerText
            ).toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


/* =====================================================
   FOCUS SEARCH
===================================================== */

function focusSearch() {

    const search =
        document.getElementById("search");


    if (!search) return;


    search.focus();


    search.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =====================================================
   CHECKOUT
===================================================== */

function continueToCheckout() {

    if (cart.length === 0) {

        alert(
            "Your bag is empty. Please add an item first."
        );

        return;
    }


    closeCart();


    const checkout =
        document.getElementById(
            "checkout-section"
        );


    if (!checkout) return;


    checkout.classList.add("show");


    checkout.scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   BACK TO BAG
===================================================== */

function backToCart() {

    const checkout =
        document.getElementById(
            "checkout-section"
        );


    if (checkout) {

        checkout.classList.remove("show");

    }


    openCart();

}


/* =====================================================
   HEART / FAVOURITE
===================================================== */

function toggleHeart(button) {

    button.classList.toggle("active");


    if (button.classList.contains("active")) {

        button.innerText = "♥";

    } else {

        button.innerText = "♡";

    }

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


    cart.forEach(function(item) {

        const quantity =
            item.quantity || 1;


        const subtotal =
            Number(item.price) * quantity;


        total += subtotal;


        items +=
            "• " +
            item.name +
            " x" +
            quantity +
            " - R" +
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


    /*
       SLINEVISION WHATSAPP
       South Africa country code = 27
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


/* =====================================================
   NEWSLETTER
===================================================== */

function subscribeNewsletter(event) {

    event.preventDefault();

    alert(
        "Thank you for joining SLINEVISION!"
    );

    event.target.reset();

    return false;

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        updateCartCount();

    }
);
