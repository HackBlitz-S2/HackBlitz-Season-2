document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    window.showMobileLogin = function() {
        document.querySelector('.tab:nth-child(1)').classList.add('active');
        document.querySelector('.tab:nth-child(2)').classList.remove('active');
        document.getElementById('mobile-login').classList.remove('hidden');
        document.getElementById('google-login').classList.add('hidden');
        document.querySelector('.tabs').classList.remove('google-active');
    };

    window.showGoogleLogin = function() {
        document.querySelector('.tab:nth-child(1)').classList.remove('active');
        document.querySelector('.tab:nth-child(2)').classList.add('active');
        document.getElementById('mobile-login').classList.add('hidden');
        document.getElementById('google-login').classList.remove('hidden');
        document.querySelector('.tabs').classList.add('google-active');
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
    const sendOtpBtn = document.getElementById('send-otp-btn');
    sendOtpBtn.addEventListener('click', function() {
        const phoneInput = document.getElementById('phone');
        const phoneNumber = phoneInput.value;
        
        if (phoneInput.checkValidity()) {
            // In a real application, you would send an API request to send an OTP
            console.log(`Sending OTP to +91${phoneNumber}`);
            
            // Add loading state
            sendOtpBtn.classList.add('loading');
            
            // Simulate API call
            setTimeout(() => {
                // Show OTP section with animation
                const otpSection = document.getElementById('otp-section');
                otpSection.classList.remove('hidden');
                
                // Update button state
                sendOtpBtn.classList.remove('loading');
                sendOtpBtn.textContent = 'Resend OTP';
                sendOtpBtn.classList.add('btn-animated');
                
                // Focus on first OTP input
                document.querySelector('.otp-input[data-index="1"]').focus();
                
                // Mock OTP for demo purposes
                // alert('For demo purposes, the OTP is: 123456');
            }, 1500);
        } else {
            alert('Please enter a valid 10-digit phone number');
        }
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect OTP from inputs
        let otp = '';
        otpInputs.forEach(input => {
            otp += input.value;
        });
        
        if (otp.length === 6) {
            // In a real application, you would verify the OTP with your backend
            console.log(`Verifying OTP: ${otp} for phone: +91${document.getElementById('phone').value}`);
            
            // Mock successful login
            alert('Login successful!');
            // Redirect to dashboard or home page
            // window.location.href = 'dashboard.html';
        } else {
            alert('Please enter a valid 6-digit OTP');
        }
    });
});

// Google Sign-in callback
function handleGoogleLogin(response) {
    // In a real application, you would verify the Google token with your backend
    console.log('Google login response:', response);
    
    // Extract user information from the credential
    const credential = response.credential;
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    console.log('User info:', payload);
    
    // Mock successful login
    alert(`Google login successful! Welcome, ${payload.name}`);
    // Redirect to dashboard or home page
    // window.location.href = 'dashboard.html';
}

// Add event listener to the login form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Perform your login logic (e.g., validation, API call)
        
        // After successful login, redirect to home.html
        window.location.href = "home.html";
    });