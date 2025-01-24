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
    const cartContainer = document.getElementById('menu-container');
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

document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");

    // Fetch menu data from JSON
    fetch("menu.json")
      .then((response) => response.json())
      .then((data) => {
        data.categories.forEach((category) => {
          // Create category section
          const categorySection = document.createElement("div");
          categorySection.innerHTML = `
            <h2>${category.name}</h2>
            <div class="food-list">
              ${category.items
                .map(
                  (item) => `
                <div class="food-item">
                  <img src="${item.image}" alt="${item.name}">
                  <p><strong>${item.name}</strong></p>
                  <p>${item.description}</p>
                  <p><strong>Price:</strong> ₹${item.price}</p>
                  <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
                </div>
              `
                )
                .join("")}
            </div>
          `;
          menuContainer.appendChild(categorySection);
        });

        attachAddToCartHandlers();
      })
      .catch((error) => {
        menuContainer.innerHTML = `<p>Error loading menu: ${error.message}</p>`;
      });
});

function attachAddToCartHandlers() {
    const cartSummary = document.getElementById("cart-total");
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count
    cartSummary.textContent = `${cartItems.length} items`;

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            // Check if item already exists in the cart
            let item = cartItems.find((i) => i.name === itemName);
            if (item) {
                item.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            cartSummary.textContent = `${cartItems.length} items in cart`;
        });
    });
}
