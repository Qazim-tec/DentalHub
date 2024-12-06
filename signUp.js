const form = document.getElementById('signupForm');
const messageElement = document.getElementById('message');

// Create and append the spinner to the form
const spinner = document.createElement('div');
spinner.className = 'spinner';
form.appendChild(spinner);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show spinner and clear previous messages
    spinner.style.display = 'block';
    messageElement.textContent = '';

    const data = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        connfirmedPasswored: document.getElementById('confirmedPassword').value, // Matches API spelling
        phoneNumber: document.getElementById('phoneNumber').value,
        homeAddress: document.getElementById('homeAddress').value,
    };

    try {
        const response = await fetch('https://dentalapi-dija.onrender.com/api/Auth/RegisterUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.flag) {
            // Hide spinner
            spinner.style.display = 'none';
            messageElement.textContent = 'Registration successful!';
            messageElement.style.color = 'green';
            
            // Clear the form fields
            form.reset();
        } else {
            // Hide spinner
            spinner.style.display = 'none';
            messageElement.textContent = `Registration failed: ${result.message || 'An error occurred.'}`;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        // Hide spinner
        spinner.style.display = 'none';
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.style.color = 'red';
    }
});




document.getElementById('signinForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const messageElement = document.getElementById('signinMessage');
    messageElement.textContent = ''; // Clear any previous message
    messageElement.style.color = ''; // Reset color

    // Create a spinner and append it to the message element
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    messageElement.appendChild(spinner);

    // Show the spinner
    spinner.style.display = 'inline-block';

    const data = {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value,
    };

    try {
        const response = await fetch('https://dentalapi-dija.onrender.com/api/Auth/LoginIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        // Hide the spinner once response is received
        spinner.style.display = 'none';

        // Handle response based on the flag (whether login was successful)
        if (response.ok && responseData.flag) {
            messageElement.textContent = 'Sign-in successful!';
            messageElement.style.color = 'green';

            // Store fullName and email in localStorage
            localStorage.setItem('userFullName', responseData.fullName);
            localStorage.setItem('userEmail', responseData.email);

            // Clear the form fields
            document.getElementById('signinForm').reset();

            // Redirect to the main page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            console.error('Sign-in failed:', responseData.Message);
            messageElement.textContent = 'Invalid email or password. Please try again.';
            messageElement.style.color = 'red';

            // Keep the form active for further attempts
            document.getElementById('signinEmail').focus(); // Focus on the email field to help the user
        }
    } catch (error) {
        // Hide the spinner in case of error
        spinner.style.display = 'none';

        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.style.color = 'red';
    }
});



// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');

const toggleConfirmedPassword = document.getElementById('toggleConfirmedPassword');
const confirmedPasswordField = document.getElementById('confirmedPassword');

togglePassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    
    // Toggle the eye icon
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

toggleConfirmedPassword.addEventListener('click', function () {
    // Toggle the type attribute
    const type = confirmedPasswordField.type === 'password' ? 'text' : 'password';
    confirmedPasswordField.type = type;
    
    // Toggle the eye icon
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleSignInPassword = document.getElementById('signin-password-eye');
    const signinPasswordField = document.getElementById('signinPassword');

    // Toggle Sign-In password visibility
    toggleSignInPassword.addEventListener('click', () => {
        const isPasswordVisible = signinPasswordField.type === 'text';
        signinPasswordField.type = isPasswordVisible ? 'password' : 'text';
        toggleSignInPassword.textContent = isPasswordVisible ? '\u{1F441}' : '\u{1F576}'; // Switch icon
    });
});







        
