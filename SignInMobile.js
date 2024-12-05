// Event listener for form submission
const form = document.getElementById('admin-signin-form');
const message = document.getElementById('response-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect the form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate form fields before making the API request
    if (!email || !password) {
        message.style.color = 'red';
        message.textContent = 'Please enter both email and password.';
        return;
    }

    try {
        // Send the login request to the API
        const response = await fetch('https://dentalapi-dija.onrender.com/api/Auth/LoginIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), // Format the request body to match your API
        });

        const data = await response.json();

        // Check if login is successful
        if (response.ok && data.flag) {
            message.style.color = 'green';
            message.textContent = data.message || 'Login successful';

            // Display user's full name after successful login
            const fullName = data.fullName;
            message.textContent += ` Welcome, ${fullName}!`;

            // Store the authentication token if available
            localStorage.setItem('authToken', data.token);

            // Redirect to the Admin Dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'index.html'; // Adjust to your admin dashboard URL
            }, 1500); // Delay for showing the success message
        } else {
            message.style.color = 'red';
            message.textContent = data.message || 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = 'An error occurred while logging in. Please try again.';
        console.error(error);
    }
});
