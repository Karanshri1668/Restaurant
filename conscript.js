// Extract query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const itemName = urlParams.get('item');
const category = urlParams.get('category');

// Display the item and category if provided
if (itemName && category) {
    document.getElementById('order-item').innerText = itemName;
    document.getElementById('order-category').innerText = category;
}

// Load cart from localStorage or initialize an empty cart
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render the cart items dynamically
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div>
                <p>${item.name} - ₹${item.price}</p>
                <input 
                    type="number" 
                    class="quantity-input" 
                    min="1" max="10"
                    value="${item.quantity}" 
                    data-index="${index}" 
                />
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Attach event listeners to quantity inputs
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            const newQuantity = parseInt(e.target.value);

            if (newQuantity >= 1) {
                updateItemQuantity(index, newQuantity);
            }
        });
    });

    // Update cart summary
    updateCartSummary();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
    renderCart(); // Re-render the cart
    if (index == 0) {
        window.location.reload();
    }
}

// Function to update the quantity of an item
function updateItemQuantity(index, quantity) {
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage
    updateCartSummary(); // Update the cart summary
}

// Function to update cart summary
function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Update the total price on the page
    document.getElementById('total-price').innerText = `₹${totalPrice}`;
    document.getElementById('cart-total').innerText = `${totalItems} item(s) in cart`;
}

// Function to handle payment and order details submission
function pay(method) {
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;

    if (address && contact && cart.length >= 1) {
        alert(`Order placed successfully! \nPayment Method: ${method} \nTotal: ₹${getTotalPrice()} \nDelivery to: ${address} (Contact: ${contact})`);
    } else if (cart.length == 0) {
        alert('Your cart is empty.');
    }else {
        alert('Please provide a valid Address and Contact number for delivery.');
    }
}

// Get total price for the cart
function getTotalPrice() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Initial rendering of the cart on page load
renderCart();
