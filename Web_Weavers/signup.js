document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    window.showRegularSignup = function() {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.querySelector('.tab:nth-child(2)').classList.remove('active');
        document.getElementById('regular-signup').classList.remove('hidden');
        document.getElementById('google-signup').classList.add('hidden');
    };

    window.showGoogleSignup = function() {
        document.querySelector('.tab:nth-child(1)').classList.remove('active');
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('regular-signup').classList.add('hidden');
        document.getElementById('google-signup').classList.remove('hidden');
    };

    // OTP input handling
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length === 1) {
                const nextIndex = parseInt(this.dataset.index) + 1;
                const nextInput = document.querySelector(`.otp-input[data-index="${nextIndex}"]`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '') {
                const prevIndex = parseInt(this.dataset.index) - 1;
                const prevInput = document.querySelector(`.otp-input[data-index="${prevIndex}"]`);
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
    });

    // Send OTP button functionality
    const sendOtpBtn = document.getElementById('signup-send-otp-btn');
    sendOtpBtn.addEventListener('click', function() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('signup-phone');
        
        if (nameInput.checkValidity() && emailInput.checkValidity() && phoneInput.checkValidity()) {
            // In a real application, you would send an API request to send an OTP
            console.log(`Sending OTP to +91${phoneInput.value} for signup`);
            
            // Show OTP section with animation
            const otpSection = document.getElementById('signup-otp-section');
            otpSection.classList.remove('hidden');
            
            // Add animation to the button
            sendOtpBtn.textContent = 'Resend OTP';
            sendOtpBtn.classList.add('btn-animated');
            
            // Remove animation after 3 seconds
            setTimeout(() => {
                sendOtpBtn.classList.remove('btn-animated');
            }, 3000);
            
            // Mock OTP for demo purposes
            alert('For demo purposes, the OTP is: 123456');
        } else {
            alert('Please fill all fields correctly');
        }
    });

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect OTP from inputs
        let otp = '';
        otpInputs.forEach(input => {
            otp += input.value;
        });
        
        if (otp.length === 6) {
            // In a real application, you would verify the OTP with your backend
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: `+91${document.getElementById('signup-phone').value}`,
                otp: otp
            };
            
            console.log('Signup data:', userData);
            
            // Mock successful signup
            alert('Signup successful!');
            // Redirect to login page
            // window.location.href = 'index.html';
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    });
});

// Google Sign-in callback
function handleGoogleSignup(response) {
    // In a real application, you would verify the Google token with your backend
    console.log('Google signup response:', response);
    
    // Extract user information from the credential
    const credential = response.credential;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    console.log('User info:', payload);
    
    // Mock successful signup
    alert(`Google signup successful! Welcome, ${payload.name}`);
    // Redirect to additional info page or dashboard
    // window.location.href = 'additional-info.html';
}