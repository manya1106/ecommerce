// Sample Products Data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 79.99,
        description: 'Premium quality wireless headphones',
        rating: 4.5,
        icon: '🎧'
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 199.99,
        description: 'Advanced fitness tracking watch',
        rating: 4.7,
        icon: '⌚'
    },
    {
        id: 3,
        name: 'USB-C Cable',
        price: 12.99,
        description: 'Durable fast charging cable',
        rating: 4.3,
        icon: '🔌'
    },
    {
        id: 4,
        name: 'Portable Charger',
        price: 49.99,
        description: '20000mAh power bank',
        rating: 4.6,
        icon: '🔋'
    },
    {
        id: 5,
        name: 'Phone Screen Protector',
        price: 9.99,
        description: 'Tempered glass screen protector',
        rating: 4.4,
        icon: '📱'
    },
    {
        id: 6,
        name: 'Laptop Stand',
        price: 34.99,
        description: 'Adjustable aluminum stand',
        rating: 4.8,
        icon: '💻'
    },
    {
        id: 7,
        name: 'Wireless Mouse',
        price: 24.99,
        description: 'Ergonomic wireless mouse',
        rating: 4.5,
        icon: '🖱️'
    },
    {
        id: 8,
        name: 'Mechanical Keyboard',
        price: 89.99,
        description: 'RGB mechanical gaming keyboard',
        rating: 4.7,
        icon: '⌨️'
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
});

// Display Products
function displayProducts(productsToDisplay) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (productsToDisplay.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">⭐ ${product.rating}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    displayCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCart();
        }
    }
}

// Display Cart Items
function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('cartTotal').textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Update Cart Count Badge
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    displayCart();
}

// Go to Checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    toggleCart();
    displayCheckoutSummary();
    document.getElementById('checkoutModal').classList.add('active');
}

// Display Checkout Summary
function displayCheckoutSummary() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    let total = 0;

    checkoutItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        checkoutItemsContainer.appendChild(summaryItem);
    });

    document.getElementById('checkoutTotal').textContent = total.toFixed(2);
}

// Close Checkout Modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Process Checkout
function processCheckout(event) {
    event.preventDefault();

    // Validation
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const cvv = document.getElementById('cvv').value;

    if (!fullName || !email || cardNumber.length !== 16 || cvv.length !== 3) {
        showNotification('Please fill in all fields correctly', 'error');
        return;
    }

    // Simulate payment processing
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    setTimeout(() => {
        // Success
        const orderNumber = generateOrderNumber();
        closeCheckout();
        cart = [];
        saveCart();
        updateCartCount();
        document.getElementById('checkoutForm').reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Complete Purchase';

        showNotification(`Order #${orderNumber} placed successfully! Check your email for confirmation.`, 'success');
    }, 2000);
}

// Search Products
function searchProducts(query) {
    if (!query.trim()) {
        displayProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    displayProducts(filtered);
}

// Sort Products
function sortProducts(sortBy) {
    let sortedProducts = [...products];

    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            return;
    }

    displayProducts(sortedProducts);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Close modal when clicking outside
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            closeCheckout();
        }
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = formattedValue;
    });

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Handle Contact Form
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;

    // Simulate sending email
    console.log('Contact form submitted:', { name, email, message });

    showNotification('Thank you! Your message has been sent.', 'success');
    event.target.reset();
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 400;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Helper Functions
function generateOrderNumber() {
    return 'ORD' + Date.now();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
