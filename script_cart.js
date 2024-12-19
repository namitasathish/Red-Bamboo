const menuItems = [
    { id: 1, name: 'Soup', price: 10, img: 'assets/soup.jpg' },
    { id: 2, name: 'Sushi', price: 15, img: 'assets/sushi.jpeg' },
    { id: 3, name: 'Curry', price: 12, img: 'assets/curry.jpg' },
    { id: 4, name: 'Mochi', price: 8, img: 'assets/mochi.avif' },
    { id: 1, name: 'Soup', price: 10, img: 'assets/soup.jpg' },
    { id: 2, name: 'Sushi', price: 15, img: 'assets/sushi.jpeg' },
    { id: 3, name: 'Curry', price: 12, img: 'assets/curry.jpg' },
    { id: 4, name: 'Mochi', price: 8, img: 'assets/mochi.avif' },
    { id: 1, name: 'Soup', price: 10, img: 'assets/soup.jpg' },
    { id: 2, name: 'Sushi', price: 15, img: 'assets/sushi.jpeg' },
    { id: 3, name: 'Curry', price: 12, img: 'assets/curry.jpg' },
    { id: 4, name: 'Mochi', price: 8, img: 'assets/mochi.avif' }

  
];

const cart = [];

function renderMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');
        menuItemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(menuItemDiv);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
        const cartItem = cart.find(cartItem => cartItem.id === itemId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        renderCart();
        updateCartCount();
    }
}

function removeFromCart(itemId) {
    const cartItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    if (cartItemIndex > -1) {
        cart.splice(cartItemIndex, 1);
        renderCart();
        updateCartCount();
    }
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cart-total').innerText = 'Total: $0';
        return;
    }

    const list = document.createElement('ul');
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-item');
        listItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        list.appendChild(listItem);
    });
    cartContainer.appendChild(list);
    
    const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.getElementById('cart-total').innerText = `Total: $${total}`;
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

function checkout() {
    alert('Please enter your delivery address on the checkout page.');
    window.location.href = 'checkout.html'; // Replace with your checkout page URL
}

renderMenu();
