const products = [
    {
        id: 1,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 29.99,
        image: "👕"
    },
    {
        id: 2,
        name: "Premium Hoodie",
        category: "fashion",
        price: 59.99,
        image: "🧥"
    },
    {
        id: 3,
        name: "Wireless Headphones",
        category: "electronics",
        price: 89.99,
        image: "🎧"
    },
    {
        id: 4,
        name: "Smart Watch",
        category: "electronics",
        price: 119.99,
        image: "⌚"
    },
    {
        id: 5,
        name: "Running Shoes",
        category: "shoes",
        price: 74.99,
        image: "👟"
    },
    {
        id: 6,
        name: "Classic Sneakers",
        category: "shoes",
        price: 64.99,
        image: "🥾"
    },
    {
        id: 7,
        name: "Leather Backpack",
        category: "accessories",
        price: 79.99,
        image: "🎒"
    },
    {
        id: 8,
        name: "Classic Sunglasses",
        category: "accessories",
        price: 39.99,
        image: "🕶️"
    }
];

let cart = JSON.parse(localStorage.getItem("shopnova-cart")) || [];

let selectedCategory = "all";

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const noProducts = document.getElementById("no-products");


// Display Products

function displayProducts() {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    productContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        noProducts.style.display = "block";
        return;
    }

    noProducts.style.display = "none";

    filteredProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <span class="price">
                        $${product.price.toFixed(2)}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        +
                    </button>

                </div>

            </div>
        `;
        

        productContainer.appendChild(card);
    });
}

// Add to Cart

function addToCart(productId) {

    const existingProduct =
        cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        const product =
            products.find(item => item.id === productId);

        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCart();
}


// Change Quantity

function changeQuantity(productId, change) {

    const item =
        cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    saveCart();
    updateCart();
}


// Remove Product

function removeFromCart(productId) {

    cart =
        cart.filter(product => product.id !== productId);

    saveCart();
    updateCart();
}


// Update Cart

function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div class="cart-item-image">
                    ${item.image}
                </div>

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>$${item.price.toFixed(2)}</p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})"
                >
                    ×
                </button>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartCount.textContent = itemCount;
    cartTotal.textContent = total.toFixed(2);
}


// Save Cart

function saveCart() {
    localStorage.setItem(
        "shopnova-cart",
        JSON.stringify(cart)
    );
}


// Category Filter

document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".category")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        displayProducts();
    });

});


// Search

searchInput.addEventListener(
    "input",
    displayProducts
);


// Cart Open / Close

const cartElement =
    document.getElementById("cart");

const overlay =
    document.getElementById("cart-overlay");

document
    .getElementById("cart-btn")
    .addEventListener("click", () => {

        cartElement.classList.add("open");
        overlay.classList.add("show");

    });

document
    .getElementById("close-cart")
    .addEventListener("click", closeCart);

overlay.addEventListener(
    "click",
    closeCart
);

function closeCart() {

    cartElement.classList.remove("open");
    overlay.classList.remove("show");

}


// Checkout

document
    .querySelector(".checkout-btn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            alert("Your cart is empty!");

        } else {

            alert(
                "Thank you for shopping with ShopNova! 🛍️"
            );

        }
    });


// Initial Load

displayProducts();
updateCart();
