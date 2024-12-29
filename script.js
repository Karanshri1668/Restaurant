function toggleBurgerMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.getElementById('nav-links');
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
}

// Index page script
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu Page Script
function showFoodItems(category) {
    // Hide all food lists
    document.getElementById('southIndian').style.display = 'none';
    document.getElementById('midIndian').style.display = 'none';
    document.getElementById('northIndian').style.display = 'none';

    // Show selected food list
    document.getElementById(category).style.display = 'block';
}


// Function to add items to the cart
function addToCart(name, price) {
    // Retrieve the existing cart from localStorage or initialize it
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cart.push({ name, price });

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart summary
    updateCartSummary();
}

// Function to update the cart summary display
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTotalElement = document.getElementById('cart-total');
    const totalItems = cart.length;

    // Update the cart total text
    cartTotalElement.textContent = `${totalItems} item(s) in cart`;
}

// Event listeners for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        // Add the selected item to the cart
        addToCart(name, price);
    });
});

// Function to retrieve and display the cart items on the cart page
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear existing cart items
    cartContainer.innerHTML = '';

    // Generate the cart items list
    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - ₹${item.price}`;
            cartContainer.appendChild(itemElement);
        });
    } else {
        cartContainer.textContent = 'Your cart is empty.';
    }
}

