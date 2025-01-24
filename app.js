let cart = [];
let currentCategory = null;

const products = [
    {
        id: 1,
        name: 'Coffee Machine',
        price: 79.99,
        imageUrl: 'coffee.jpeg',
        features: [
            '12-cup capacity',
            'Programmable timer',
            'Keep-warm function'
        ],
        category: 'audio'
    },
    {
        id: 2,
        name: 'Hot and Cold Vendo',
        price: 129.99,
        imageUrl: 'hot and cold vendo.jpeg',
        features: [
          'Hot and cold water',
           'Child lock',
            'Stainless steel tank'
        ],
        category: 'appliances'
    },
    {
        id: 3,
        name: 'Videoke Machine',
        price: 49.99,
        imageUrl: 'videoke.jpeg',
        features: [
            'Bluetooth connectivity',
            'Dual microphone inputs',
             'Built-in speaker'
        ],
        category: 'audio'
    },
      {
        id: 4,
        name: 'Speaker',
        price: 199.99,
        imageUrl: 'speaker.jpeg',
         features: [
             'Powerful bass',
            'Wireless connection',
             'Long battery life'
        ],
         category: 'audio'
    }
];

function renderProducts() {
    const productListContainer = document.getElementById('product-list');
    productListContainer.innerHTML = '';

    const productsToRender = currentCategory
        ? products.filter(product => product.category === currentCategory)
        : products;

    productsToRender.forEach(product => {
        const productHTML = `
           <div class="product">
               <img src="${product.imageUrl}" alt="${product.name}">
               <h3 class="product-title">${product.name}</h3>
               <p class="price">$${product.price.toFixed(2)}</p>
                <ul class="product-features">
                 ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
               <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Add ${product.name} to Cart">Add to Cart</button>
           </div>
        `;
        productListContainer.innerHTML += productHTML;
    });
}
function handleCategoryClick(category) {
    currentCategory = category;
    renderProducts();
}
function resetCategory() {
    currentCategory = null;
    renderProducts();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
     if (product) {
        cart.push(product);
        updateCartDisplay();
    } else {
        console.error('Product not found')
    }
}
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');
    cartItemsList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
         listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})" aria-label="Remove ${item.name} from Cart">Remove</button>`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });

    cartTotalDisplay.textContent = total.toFixed(2);
    cartCountDisplay.textContent = cart.length;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.toggle('show');
}

// Initial product rendering
renderProducts();
// Add event listeners to category divs
document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    categories.forEach(categoryDiv => {
        categoryDiv.addEventListener('click', () => {
            const category = categoryDiv.querySelector('h3').textContent.toLowerCase();
            handleCategoryClick(category);
        });
    });
      const viewAllButton = document.getElementById('view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', resetCategory);
    }
});
