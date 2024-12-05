const form = document.getElementById('admin-login-form');
const message = document.getElementById('response-message');

// Hardcoded valid login credentials
const validEmail = "yetkemsupper@gmail.com";
const validPassword = "password123"; // Use a secure password in production!

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if the entered credentials match the hardcoded values
    if (email === validEmail && password === validPassword) {
        message.style.color = 'green';
        message.textContent = `Login successful! Welcome ${validEmail.split('@')[0]}!`;

        // Redirect to the admin dashboard
        setTimeout(() => {
            window.location.href = 'index.html'; // Update with your actual dashboard URL
        }, 1500);
    } else {
        message.style.color = 'red';
        message.textContent = 'Login failed. Please check your credentials.';
    }
});
