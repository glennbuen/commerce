let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');
    cartItemsList.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})">Remove</button>`;
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