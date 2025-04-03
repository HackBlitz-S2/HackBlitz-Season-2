// Product page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Image preview functionality
    const productImage = document.getElementById('productImage');
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    const donationForm = document.getElementById('donationForm');

    // Handle image upload and preview
    if (productImage) {
        productImage.addEventListener('change', function(event) {
            const file = event.target.files[0];
            
            if (file) {
                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB. Please choose a smaller image.');
                    this.value = '';
                    return;
                }
                
                // Check file type
                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validTypes.includes(file.type)) {
                    alert('Invalid file type. Please upload JPG, PNG, or GIF.');
                    this.value = '';
                    return;
                }
                
                // Create preview
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    imagePreview.classList.add('has-image');
                }
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Form submission
    if (donationForm) {
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show success message
                showSuccessMessage();
                
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just reset the form after a delay
                setTimeout(() => {
                    donationForm.reset();
                    previewImg.src = 'https://via.placeholder.com/300x200?text=No+Image+Selected';
                    imagePreview.classList.remove('has-image');
                }, 3000);
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = donationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightField(field, true);
            } else {
                highlightField(field, false);
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields.');
        }
        
        return isValid;
    }

    // Highlight invalid fields
    function highlightField(field, isInvalid) {
        if (isInvalid) {
            field.style.borderColor = '#ff3860';
            field.style.boxShadow = '0 0 0 3px rgba(255, 56, 96, 0.2)';
        } else {
            field.style.borderColor = '#ddd';
            field.style.boxShadow = 'none';
        }
    }

    // Show success message
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your donation has been submitted successfully.</p>
            </div>
        `;
        
        // Add success message styles
        const style = document.createElement('style');
        style.textContent = `
            .success-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .success-content {
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                text-align: center;
                max-width: 400px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: scaleIn 0.3s ease-out;
            }
            
            .success-content i {
                font-size: 60px;
                color: #4CAF50;
                margin-bottom: 20px;
            }
            
            .success-content h3 {
                font-size: 24px;
                margin-bottom: 10px;
                color: #333;
            }
            
            .success-content p {
                color: #666;
                font-size: 16px;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
    }
});

// Navbar functionality (same as in navbar.js)
function toggleAuthMenu() {
    const dropdown = document.getElementById('authDropdown');
    dropdown.classList.toggle('show');
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.auth-toggle') && 
        !event.target.parentElement.matches('.auth-toggle')) {
        const dropdowns = document.getElementsByClassName('auth-dropdown');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Modal functionality
function openModal(modalId) {
    // This would open a login/register modal
    // For this example, we'll just show an alert
    alert(`${modalId} would open here`);
}