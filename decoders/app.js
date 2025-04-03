// Firebase Auth instance
const auth = firebase.auth();

// DOM Elements
const authContainer = document.getElementById('auth-container');
const homeContainer = document.getElementById('home-container');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubmit = document.getElementById('auth-submit');
const authSwitch = document.getElementById('auth-switch');
const authError = document.getElementById('auth-error');
const userEmail = document.getElementById('user-email');

let isLogin = true;

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        authContainer.classList.add('hidden');
        homeContainer.classList.remove('hidden');
        userEmail.textContent = user.email;
        showSection('dashboard');
    } else {
        // User is signed out
        authContainer.classList.remove('hidden');
        homeContainer.classList.add('hidden');
    }
});

// Toggle between login and register
window.toggleAuth = function() {
    isLogin = !isLogin;
    authTitle.textContent = isLogin ? 'Login' : 'Register';
    authSubmit.textContent = isLogin ? 'Login' : 'Register';
    authSwitch.innerHTML = isLogin 
        ? 'New user? <a href="javascript:void(0)" onclick="toggleAuth()">Register here</a>'
        : 'Already have an account? <a href="javascript:void(0)" onclick="toggleAuth()">Login here</a>';
    authError.textContent = '';
}

// Handle form submission
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        if (isLogin) {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            await auth.createUserWithEmailAndPassword(email, password);
        }
        authError.textContent = '';
    } catch (error) {
        authError.textContent = error.message;
    }
});

// Logout function
window.logout = function() {
    auth.signOut();
}

// Show different sections
window.showSection = function(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Initialize the auth state
toggleAuth();