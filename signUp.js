document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const messageElement = document.getElementById('message');
    messageElement.textContent = ''; // Clear any previous message
    
    const data = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        connfirmedPasswored: document.getElementById('confirmedPassword').value, // matches API spelling
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
            messageElement.textContent = 'Registration successful!';
            messageElement.style.color = 'green';
            
            // Clear the form fields
            document.getElementById('signupForm').reset();
        } else {
            messageElement.textContent = `Registration failed: ${result.message || 'An error occurred.'}`;
            messageElement.style.color = 'red';
        }
    } catch (error) {
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
            // If the login failed (either flag is false or response code isn't OK)
            console.error('Sign-in failed:', responseData.Message);
            messageElement.textContent = `Invalid email or password. Please try again.`;
            messageElement.style.color = 'red';

            // Keep the form active for further attempts
            document.getElementById('signinEmail').focus(); // Focus on the email field to help the user
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'An error occurred. Please try again later.';
        messageElement.style.color = 'red';
    }
});





        
