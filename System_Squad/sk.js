// Sample data for items
const sampleItems = [
    {
        id: 1,
        title: "Vintage Denim Jacket",
        category: "clothing",
        condition: "good",
        type: "exchange",
        price: 0,
        location: "New York, NY",
        image: "jacket.jpg",
        description: "Great condition vintage denim jacket from the 90s. Looking for a new home as I no longer wear it.",
        postedBy: "user123",
        postedDate: "2023-05-15"
    },
    {
        id: 2,
        title: "JavaScript: The Good Parts",
        category: "books",
        condition: "like new",
        type: "donation",
        price: 0,
        location: "San Francisco, CA",
        image: "js-book.jpg",
        description: "Excellent condition programming book. Great resource for learning JavaScript fundamentals.",
        postedBy: "codeMaster",
        postedDate: "2023-06-02"
    },
    {
        id: 3,
        title: "iPhone X 64GB",
        category: "electronics",
        condition: "good",
        type: "sale",
        price: 250,
        location: "Chicago, IL",
        image: "iphone.jpg",
        description: "Works perfectly, minor cosmetic wear. Includes original charger and box.",
        postedBy: "techGuy",
        postedDate: "2023-06-10"
    },
    {
        id: 4,
        title: "Wooden Dining Table",
        category: "furniture",
        condition: "fair",
        type: "exchange",
        price: 0,
        location: "Austin, TX",
        image: "table.jpg",
        description: "Solid wood dining table with some scratches. Could use refinishing or make a great project piece.",
        postedBy: "homeMaker",
        postedDate: "2023-06-05"
    }
];

// DOM Elements
const featuredItemsContainer = document.getElementById('featured-items');
const categoryCards = document.querySelectorAll('.category-card');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const authButtons = document.querySelector('.auth-buttons');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedItems();
    setupEventListeners();
});

// Render featured items on homepage
function renderFeaturedItems() {
    featuredItemsContainer.innerHTML = '';
    
    // Display first 4 items as featured
    const featuredItems = sampleItems.slice(0, 4);
    
    featuredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <div class="item-image">
                <img src="images/${item.image}" alt="${item.title}">
            </div>
            <div class="item-details">
                <h3 class="item-title">${item.title}</h3>
                <div class="item-meta">
                    <span>${item.condition}</span>
                    <span class="item-price">${formatPrice(item)}</span>
                </div>
                <p class="item-location">
                    <i class="fas fa-map-marker-alt"></i> ${item.location}
                </p>
                <div class="item-actions">
                    <button class="btn-outline" onclick="viewItemDetails(${item.id})">Details</button>
                    <button class="btn-primary" onclick="contactSeller(${item.id})">Contact</button>
                </div>
            </div>
        `;
        featuredItemsContainer.appendChild(itemCard);
    });
}

// Format price based on listing type
function formatPrice(item) {
    switch(item.type) {
        case 'donation':
            return 'FREE';
        case 'exchange':
            return 'FOR TRADE';
        default:
            return `$${item.price}`;
    }
}

// View item details
function viewItemDetails(itemId) {
    const item = sampleItems.find(i => i.id === itemId);
    if (item) {
        // In a real app, this would redirect to a details page or open a modal
        alert(`Item Details:\n\n${item.title}\n\n${item.description}\n\nCondition: ${item.condition}\nLocation: ${item.location}\nListed by: ${item.postedBy}`);
    }
}

// Contact seller
function contactSeller(itemId) {
    const item = sampleItems.find(i => i.id === itemId);
    if (item) {
        // In a real app, this would open a messaging interface
        alert(`Contacting seller about: ${item.title}\n\nThis would open a messaging system in the full application.`);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category card clicks
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            // In a real app, this would redirect to filtered listings
            alert(`Showing ${category} listings\n\nIn the full application, this would redirect to the listings page filtered by ${category}.`);
        });
    });
    
    // Login/signup buttons
    loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    signupBtn.addEventListener('click', () => signupModal.classList.add('active'));
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Switch between login/signup
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Form submissions (would be handled by backend in real app)
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login functionality would be handled by backend in the full application.');
    this.reset();
    loginModal.classList.remove('active');
});

document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Signup functionality would be handled by backend in the full application.');
    this.reset();
    signupModal.classList.remove('active');
});