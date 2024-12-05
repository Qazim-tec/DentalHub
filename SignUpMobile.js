const form = document.getElementById('admin-signup-form');
const message = document.getElementById('response-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect input values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmedPassword = document.getElementById('confirmPassword').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const homeAddress = document.getElementById('homeAddress').value.trim();

    // Basic validation for password match
    if (password !== confirmedPassword) {
        message.style.color = 'red';
        message.textContent = 'Passwords do not match.';
        return;
    }

    try {
        // Send API request to RegisterUser on the updated endpoint
        const response = await fetch('https://dentalapi-dija.onrender.com/api/Auth/RegisterUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                fullName, 
                email, 
                password, 
                connfirmedPasswored: confirmedPassword,  // Keep the spelling exactly as provided
                phoneNumber, 
                homeAddress 
            }),
        });

        const data = await response.json();

        if (response.ok && data.flag) {
            // Display success message
            message.style.color = 'green';
            message.textContent = data.message || 'User account created successfully.';

            // Optionally redirect to login page after successful sign-up
            setTimeout(() => {
                window.location.href = 'SignInMobile.html'; // Replace with your login page URL
            }, 1500);
        } else {
            message.style.color = 'red';
            message.textContent = data.message || 'Sign up failed. Please try again.';
        }
    } catch (error) {
        message.style.color = 'red';
        message.textContent = 'An error occurred. Please try again.';
        console.error(error);
    }
});
