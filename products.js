// Product data
const products = [
    {
        id: 1,
        name: "iPhone 14 Pro",
        price: 999,
        brand: "Apple",
        image: "images/iPhone 14 Pro.jpg",
        description: "Latest iPhone with advanced features and A16 Bionic chip"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 1199,
        brand: "Samsung",
        image: "images/Samsung Galaxy S23 Ultra.jpg",
        description: "Premium Android flagship with S-Pen and 200MP camera"
    },
    {
        id: 3,
        name: "Vivo V25 Pro",
        price: 399,
        brand: "Vivo",
        image: "images/Vivo V25 Pro.jpg",
        description: "Feature-rich mid-range phone with 64MP camera"
    },
    {
        id: 4,
        name: "OPPO Reno8 Pro",
        price: 449,
        brand: "OPPO",
        image: "images/OPPO Reno8 Pro.jpg",
        description: "Camera-focused smartphone with MariSilicon X chip"
    },
    {
        id: 5,
        name: "Nokia G60 5G",
        price: 299,
        brand: "Nokia",
        image: "images/Nokia G60 5G.jpg",
        description: "Reliable 5G smartphone with pure Android experience"
    },
    {
        id: 6,
        name: "iPhone 13",
        price: 699,
        brand: "Apple",
        image: "images/iPhone 13.jpg",
        description: "Powerful iPhone with A15 Bionic chip and great cameras"
    },
    {
        id: 7,
        name: "Samsung Galaxy A54",
        price: 449,
        brand: "Samsung",
        image: "images/Samsung Galaxy A54.jpg",
        description: "Mid-range Samsung with premium features"
    },
    {
        id: 8,
        name: "OnePlus 11",
        price: 699,
        brand: "OnePlus",
        image: "images/OnePlus 11.jpg",
        description: "Flagship killer with Snapdragon 8 Gen 2"
    }
];

function displayProducts() {
    const productsContainer = document.querySelector('.products-grid');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="quick-view-btn">Quick View</button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="brand">${product.brand}</p>
                <p class="description">${product.description}</p>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    <span class="button-text">Add to Cart</span>
                    <span class="button-icon">🛒</span>
                </button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', displayProducts);
