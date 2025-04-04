// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchModal(closeModalId, openModalId) {
    closeModal(closeModalId);
    openModal(openModalId);
}

// Auth Dropdown Functions
function toggleAuthMenu() {
    const dropdown = document.getElementById('authDropdown');
    const toggle = document.querySelector('.auth-toggle');
    dropdown.classList.toggle('show');
    toggle.classList.toggle('active');

    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.auth-container')) {
            dropdown.classList.remove('show');
            toggle.classList.remove('active');
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Search functionality
document.querySelector('.search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.querySelector('.search-input').value;
    // Add your search logic here
    console.log('Searching for:', searchTerm);
});

// Form submissions
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        // Add your authentication logic here
        console.log('Form submitted:', data);
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
}