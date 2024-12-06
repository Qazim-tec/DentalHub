// // Event listener for form submission
// const form = document.getElementById('admin-signin-form');
// const message = document.getElementById('response-message');

// form.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // Collect the form input values
//     const email = document.getElementById('email').value.trim();
//     const password = document.getElementById('password').value.trim();

//     // Validate form fields before making the API request
//     if (!email || !password) {
//         message.style.color = 'red';
//         message.textContent = 'Please enter both email and password.';
//         return;
//     }

//     try {
//         // Send the login request to the API
//         const response = await fetch('https://dentalapi-dija.onrender.com/api/Auth/LoginIn', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }), // Format the request body to match your API
//         });

//         const data = await response.json();

//         // Check if login is successful
//         if (response.ok && data.flag) {
//             message.style.color = 'green';
//             message.textContent = data.message || 'Login successful';

//             // Display user's full name after successful login
//             const fullName = data.fullName;
//             message.textContent += ` Welcome, ${fullName}!`;

//             // Store the authentication token if available
//             localStorage.setItem('authToken', data.token);

//             // Redirect to the Admin Dashboard after a short delay
//             setTimeout(() => {
//                 window.location.href = 'index.html'; // Adjust to your admin dashboard URL
//             }, 1500); // Delay for showing the success message
//         } else {
//             message.style.color = 'red';
//             message.textContent = data.message || 'Login failed. Please check your credentials.';
//         }
//     } catch (error) {
//         message.style.color = 'red';
//         message.textContent = 'An error occurred while logging in. Please try again.';
//         console.error(error);
//     }
// });


const form = document.getElementById('admin-signin-form');
const message = document.getElementById('response-message');

// Create a spinner element
const spinner = document.createElement('div');
spinner.className = 'spinner'; // Assign the spinner class
form.appendChild(spinner);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show the spinner and clear previous messages
    spinner.style.display = 'block';
    message.textContent = '';

    // Collect the form input values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate form fields before making the API request
    if (!email || !password) {
        spinner.style.display = 'none'; // Hide spinner
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
            spinner.style.display = 'none'; // Hide spinner
            message.style.color = 'green';
            message.textContent = data.message || 'Login successful';

            // Store the user's full name and token in localStorage
            const fullName = data.fullName;
            localStorage.setItem('userFullName', fullName);
            localStorage.setItem('authToken', data.token);

            // Redirect to the main page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html'; // Adjust to your homepage URL
            }, 1500); // Delay for showing the success message
        } else {
            spinner.style.display = 'none'; // Hide spinner
            message.style.color = 'red';
            message.textContent = data.message || 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        spinner.style.display = 'none'; // Hide spinner
        message.style.color = 'red';
        message.textContent = 'An error occurred while logging in. Please try again.';
        console.error(error);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('password-eye');
    const passwordField = document.getElementById('password');

    togglePassword.addEventListener('click', () => {
        const isPasswordVisible = passwordField.type === 'text';
        passwordField.type = isPasswordVisible ? 'password' : 'text';
        togglePassword.textContent = isPasswordVisible ? '\u{1F441}' : '\u{1F576}'; // Switch icon
    });
});

