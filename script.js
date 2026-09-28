/* =================================
   NOVA STORE - JAVASCRIPT
================================= */

let cart = JSON.parse(localStorage.getItem("novaCart")) || [];


/* ================================
   ADD TO CART
================================ */

function addToCart(name, price) {

    const existingProduct = cart.find(
        product => product.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    // Premium notification
    showToast(name + " added to cart 🛒");
}


/* ================================
   CART COUNT
================================ */

function updateCartCount() {

    const cartCount =
        document.querySelector(".cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, product) =>
            total + product.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


/* ================================
   SEARCH PRODUCTS
================================ */

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");

    const products =
        document.querySelectorAll(".product-card");

    if (!searchInput) return;

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();

    products.forEach(product => {

        const productName =
            product.querySelector("h3");

        if (!productName) return;

        const name =
            productName.textContent
                .toLowerCase();

        if (name.includes(searchText)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}


/* ================================
   PREMIUM TOAST NOTIFICATION
================================ */

function showToast(message) {

    // Remove old toast
    const oldToast =
        document.querySelector(".nova-toast");

    if (oldToast) {
        oldToast.remove();
    }


    // Create toast
    const toast =
        document.createElement("div");

    toast.className = "nova-toast";

    toast.innerHTML = `
        <span>✓</span>
        <p>${message}</p>
    `;


    // Add to page
    document.body.appendChild(toast);


    // Show animation
    setTimeout(() => {

        toast.classList.add("show");

    }, 50);


    // Hide after 2.5 seconds
    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            if (toast) {
                toast.remove();
            }

        }, 300);

    }, 2500);
}


/* ================================
   PAGE LOAD
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Update cart number
        updateCartCount();


        // Search
        const searchInput =
            document.getElementById(
                "searchInput"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchProducts
            );

        }

    }
);