/* =========================
   SLINEVISION PRODUCTS
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
        name: "Zip up",
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
        name: "VE.Shadow set",
        price: 450,
        image: "IMG-20260814-WA0026.jpg"
    },

    {
        name: "Pink Galaxy Set",
        price: 800,
        image: "IMG-20260815-WA0046.jpg"
    },

    {
        name: "Galaxy drift set",
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

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   PRODUCT POPUP VARIABLES
========================= */

let selectedProduct = null;
let selectedSize = "";
let selectedColor = "";
let modalQuantity = 1;


/* =========================
   OPEN PRODUCT
========================= */

function openProduct(index) {

    selectedProduct = products[index];

    selectedSize = "";
    selectedColor = "";
    modalQuantity = 1;

    document.getElementById("modal-image").src =
        selectedProduct.image;

    document.getElementById("modal-image").alt =
        selectedProduct.name;

    document.getElementById("modal-name").innerText =
        selectedProduct.name;

    document.getElementById("modal-price").innerText =
        "R" + selectedProduct.price.toFixed(2);

    document.getElementById("modal-quantity").innerText =
        "1";

    document
        .querySelectorAll(".size-options button")
        .forEach(button => button.classList.remove("selected"));

    document
        .querySelectorAll(".color-options button")
        .forEach(button => button.classList.remove("selected"));

    document
        .getElementById("product-modal")
        .classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {

    document
        .getElementById("product-modal")
        .classList.remove("show");

    document.body.style.overflow = "";
}


/* =========================
   SIZE
========================= */

function selectSize(button) {

    document
        .querySelectorAll(".size-options button")
        .forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");

    selectedSize = button.innerText;
}


/* =========================
   COLOR
========================= */

function selectColor(button) {

    document
        .querySelectorAll(".color-options button")
        .forEach(item => item.classList.remove("selected"));

    button.classList.add("selected");

    selectedColor = button.innerText;
}


/* =========================
   MODAL QUANTITY
========================= */

function changeModalQuantity(amount) {

    modalQuantity += amount;

    if (modalQuantity < 1) {
        modalQuantity = 1;
    }

    if (modalQuantity > 20) {
        modalQuantity = 20;
    }

    document.getElementById("modal-quantity").innerText =
        modalQuantity;
}


/* =========================
   ADD SELECTED PRODUCT
========================= */

function addSelectedProduct() {

    if (!selectedProduct) {
        return;
    }

    if (!selectedSize) {

        alert("Please select a size.");

        return;
    }

    if (!selectedColor) {

        alert("Please select a color.");

        return;
    }


    let existing = cart.find(item =>
        item.name === selectedProduct.name &&
        item.size === selectedSize &&
        item.color === selectedColor
    );


    if (existing) {

        existing.quantity += modalQuantity;

    } else {

        cart.push({

            name: selectedProduct.name,

            price: Number(selectedProduct.price),

            image: selectedProduct.image,

            size: selectedSize,

            color: selectedColor,

            quantity: modalQuantity

        });

    }


    saveCart();

    closeProduct();


    setTimeout(function() {

        document
            .getElementById("cart-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 200);

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

    const totalElement =
        document.getElementById("cart-total");

    const countElement =
        document.getElementById("cart-count");


    container.innerHTML = "";


    let total = 0;
    let count = 0;


    if (cart.length === 0) {

        container.innerHTML =
            "<p>Your bag is empty.</p>";

        totalElement.innerText =
            "R0.00";

        countElement.innerText =
            "0";

        return;
    }


    cart.forEach(function(item, index) {

        let quantity =
            item.quantity || 1;

        let price =
            Number(item.price);

        let subtotal =
            price * quantity;


        total += subtotal;

        count += quantity;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-details">
                    Size: ${item.size || "N/A"}
                    &nbsp; • &nbsp;
                    Color: ${item.color || "N/A"}
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

                <div>
                    Subtotal:
                    R${subtotal.toFixed(2)}
                </div>

                <button
                    class="remove-button"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    totalElement.innerText =
        "R" + total.toFixed(2);

    countElement.innerText =
        count;
}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();
}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

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

    cart.splice(index, 1);

    saveCart();
}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    let search =
        document
        .getElementById("search")
        .value
        .toLowerCase();


    let productCards =
        document.querySelectorAll(".product");


    productCards.forEach(function(product) {

        let name =
            product.dataset.name.toLowerCase();


        if (name.includes(search)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


/* =========================
   CHECKOUT
========================= */

function continueToCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add an item to your bag first."
        );

        return;
    }


    document
        .getElementById("checkout-section")
        .style.display = "block";


    document
        .getElementById("checkout-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   BACK TO CART
========================= */

function backToCart() {

    document
        .getElementById("checkout-section")
        .style.display = "none";


    document
        .getElementById("cart-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   WHATSAPP ORDER
========================= */

function placeOrderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your bag is empty.");

        return;
    }


    let name =
        document
        .getElementById("customer-name")
        .value.trim();


    let phone =
        document
        .getElementById("customer-phone")
        .value.trim();


    let address =
        document
        .getElementById("customer-address")
        .value.trim();


    if (!name || !phone || !address) {

        alert(
            "Please complete your delivery details."
        );

        return;
    }


    let payment =
        document
        .querySelector(
            'input[name="payment"]:checked'
        )
        .value;


    let items = "";
    let total = 0;


    cart.forEach(function(item) {

        let quantity =
            item.quantity || 1;

        let subtotal =
            Number(item.price) * quantity;


        total += subtotal;


        items +=

            "• " +
            item.name +

            " x" +
            quantity +

            "\n  Size: " +
            (item.size || "N/A") +

            "\n  Color: " +
            (item.color || "N/A") +

            "\n  R" +
            subtotal.toFixed(2) +

            "\n\n";

    });


    let message =

        "🛍️ SLINEVISION NEW ORDER\n\n" +

        "ORDER ITEMS\n" +
        "--------------------\n" +

        items +

        "TOTAL: R" +
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
       YOUR WHATSAPP NUMBER
       Country code included.
    */

    let whatsappNumber =
        "27691603308";


    let url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.location.href = url;
}


/* =========================
   CLOSE POPUP WHEN
   CLICKING OUTSIDE
========================= */

document
    .getElementById("product-modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeProduct();

        }

    });


/* =========================
   START
========================= */

displayCart();
