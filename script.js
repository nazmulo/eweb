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


