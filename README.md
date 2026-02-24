# ShopHub - E-commerce Store

A modern, fully functional e-commerce website built with vanilla HTML, CSS, and JavaScript. No frameworks required!

## 🌟 Features

### Core E-commerce Features
- **Product Catalog** - Browse 8 featured tech products with descriptions, prices, and ratings
- **Search Functionality** - Quickly find products by name or keywords
- **Sort & Filter** - Sort products by price (low to high, high to low) and alphabetically
- **Shopping Cart** - Add/remove items, update quantities, and view cart totals
- **Cart Persistence** - Cart data is saved to browser localStorage (persists across sessions)
- **Checkout Process** - Complete checkout form with shipping and payment information
- **Responsive Design** - Fully functional on mobile, tablet, and desktop devices

### Additional Sections
- **Hero Section** - Eye-catching landing section with call-to-action
- **About Section** - Company information and mission statement
- **Contact Form** - Get in touch with customer service
- **Footer** - Multiple footer sections with links and social media
- **Notifications** - Real-time user feedback when items are added to cart

## 📁 Project Structure

```
ai_ecommerce/
├── index.html        # Main HTML markup and structure
├── styles.css        # Complete styling and layout
├── script.js         # All JavaScript functionality
└── README.md         # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with CSS variables, Flexbox, and Grid
- **JavaScript (ES6+)** - All functionality with no external dependencies
- **LocalStorage API** - For cart persistence
- **Responsive Web Design** - Mobile-first approach

## 🚀 Quick Start

### Running Locally

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd ai_ecommerce
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then visit: http://localhost:8000
     ```

3. **Start shopping**
   - Browse products in the "Shop" section
   - Use the search bar to find specific items
   - Add items to your cart
   - Proceed to checkout when ready

## 📦 Sample Products

The store includes 8 pre-loaded tech products:

| Product | Price | Rating |
|---------|-------|--------|
| Wireless Headphones | $79.99 | ⭐ 4.5 |
| Smart Watch | $199.99 | ⭐ 4.7 |
| USB-C Cable | $12.99 | ⭐ 4.3 |
| Portable Charger | $49.99 | ⭐ 4.6 |
| Phone Screen Protector | $9.99 | ⭐ 4.4 |
| Laptop Stand | $34.99 | ⭐ 4.8 |
| Wireless Mouse | $24.99 | ⭐ 4.5 |
| Mechanical Keyboard | $89.99 | ⭐ 4.7 |

## 💻 Key JavaScript Functions

### Cart Management
- `addToCart(productId)` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity(productId, change)` - Adjust item quantity
- `displayCart()` - Render cart items and totals
- `updateCartCount()` - Update cart badge count

### Search & Sort
- `searchProducts()` - Filter products by search term
- `sortProducts()` - Sort by selected criteria
- `displayProducts(productsToDisplay)` - Render product grid

### Checkout
- `goToCheckout()` - Open checkout modal
- `processCheckout(event)` - Validate and process order
- `closeCheckout()` - Close checkout modal

### Utilities
- `saveCart()` - Persist cart to localStorage
- `showNotification(message)` - Display toast notification
- `handleContactSubmit(event)` - Process contact form submission

## 🎨 Design Features

### Color Scheme
- **Primary**: #007bff (Blue)
- **Secondary**: #6c757d (Gray)
- **Success**: #28a745 (Green)
- **Danger**: #dc3545 (Red)

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Key CSS Classes
- `.product-card` - Individual product cards
- `.cart-sidebar` - Shopping cart side panel
- `.modal` - Checkout form modal
- `.btn` - Button styles (primary, secondary, block)
- `.container` - Content wrapper (max-width: 1200px)

## 📝 How to Customize

### Add New Products
Edit the `products` array in `script.js`:
```javascript
const products = [
    {
        id: 9,
        name: 'Your Product',
        price: 99.99,
        description: 'Product description',
        rating: 4.5,
        icon: '🎁'
    }
    // ... more products
];
```

### Modify Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* etc... */
}
```

### Styling Changes
All styling is in `styles.css` - easily customize layout, fonts, spacing, and animations.

## 🔒 Data Storage

- **Cart Data**: Stored in browser localStorage as `cart` key
- **No Backend Required**: Works completely client-side
- **Data Persistence**: Cart survives page refresh and browser close

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚙️ Performance

- **Zero Dependencies** - No external libraries (zero overhead)
- **Optimized CSS** - CSS Grid and Flexbox for efficient layouts
- **Smooth Animations** - CSS transitions for fluid UX
- **Fast Loading** - All assets load instantly

## 🐛 Known Limitations

- Checkout is for demonstration purposes (no actual payment processing)
- Products are hardcoded (real implementation would fetch from an API/database)
- Cart data is local to browser (no server-side persistence)
- No user authentication system

## 🚀 Future Enhancements

- [ ] Backend API integration for products
- [ ] User authentication and accounts
- [ ] Real payment gateway integration
- [ ] Product reviews and ratings system
- [ ] Wishlist/favorites feature
- [ ] Admin dashboard for product management
- [ ] Order history tracking
- [ ] Product filters by category

## 📄 License

This project is open source and available for educational and personal use.

## 👨‍💻 Author

Created as a demonstration of vanilla JavaScript e-commerce functionality.
