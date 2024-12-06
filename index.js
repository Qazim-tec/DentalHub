window.addEventListener('DOMContentLoaded', () => {
    const userFullName = localStorage.getItem('userFullName'); // Retrieve the user's full name
    const loginButton = document.getElementById('loginButton'); // Find the login button

    if (!loginButton) {
        console.error('Login button not found on the page.');
        return;
    }

    if (userFullName) {
        // Get the first letter of the full name
        const firstLetter = userFullName.charAt(0).toUpperCase();

        // Create a user avatar element
        const userAvatar = document.createElement('div');
        userAvatar.textContent = firstLetter;
        userAvatar.style.cssText = `
            cursor: pointer;
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            background-color: #007bff;
            color: white;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            position: relative;
        `;

        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.style.cssText = `
            position: absolute;
            top: 50px;
            right: 0;
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            display: none;
            z-index: 1000;
        `;
        dropdown.innerHTML = `
            <a href="profile.html" style="display: block; padding: 10px; text-decoration: none; color: #333;">Profile</a>
            <a href="#" id="logoutLink" style="display: block; padding: 10px; text-decoration: none; color: #333;">Logout</a>
        `;

        // Append dropdown to the avatar
        userAvatar.appendChild(dropdown);

        // Replace the login button with the avatar
        loginButton.parentNode.replaceChild(userAvatar, loginButton);

        // Show dropdown on hover
        userAvatar.addEventListener('mouseenter', () => {
            dropdown.style.display = 'block';
        });

        // Hide dropdown when not hovering
        userAvatar.addEventListener('mouseleave', () => {
            dropdown.style.display = 'none';
        });

        // Prevent avatar click from redirecting to sign-in page
        userAvatar.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior (if any)
        });

        // Logout functionality
        const logoutLink = dropdown.querySelector('#logoutLink');
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Do you want to logout?')) {
                localStorage.removeItem('userFullName');
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html'; // Redirect to login page
            }
        });
    } else {
        console.error('User full name not found in localStorage.');
    }
});




// window.addEventListener('DOMContentLoaded', () => {
//     const userFullName = localStorage.getItem('userFullName'); // Retrieve user's full name
//     const loginButton = document.getElementById('loginButton'); // Get the login button

//     if (userFullName && loginButton) {
//         // Create a welcome message element
//         const welcomeMessage = document.createElement('span');
//         welcomeMessage.textContent = `Welcome, ${userFullName}`; // Display the user's name
//         welcomeMessage.style.cursor = 'pointer';

//         // Replace the login button with the welcome message
//         loginButton.replaceWith(welcomeMessage);

//         // Add a click listener for logout functionality
//         welcomeMessage.addEventListener('click', () => {
//             // Show a confirmation dialog box
//             const userConfirmed = confirm('Do you want to logout?');
//             if (userConfirmed) {
//                 localStorage.clear(); // Clear all stored user data
//                 alert('You have been logged out successfully.');
//                 // Remain on the current page after logout
//                 window.location.href = 'index.html';
//             } else {
//                 alert('You remain logged in.');
//                 // Do nothing, stay on the index page
//                  window.location.href = 'index.html';
//             }
//         });
//     }
// });



window.addEventListener('DOMContentLoaded', () => {
    const userFullName = localStorage.getItem('userFullName'); // Retrieve the user's full name from localStorage

    // Get the buttons
    const homeServiceButton = document.getElementById('homeServiceButton');
    const bookAppointmentButton = document.getElementById('bookAppointmentButton');
    const chatDentistButton = document.getElementById('chatDentistButton');

    // Function to handle button clicks
    const handleButtonClick = (event, redirectUrl) => {
        // If user is not logged in, prevent the default action and redirect to login page
        if (!userFullName) {
            event.preventDefault();  // Prevent the default navigation
            window.location.href = 'Sign-up.html'; // Redirect to sign-in page
        }
    };

    // Attach event listeners to the buttons
    homeServiceButton.addEventListener('click', (event) => handleButtonClick(event, 'HomeService.html'));
    bookAppointmentButton.addEventListener('click', (event) => handleButtonClick(event, 'Appointment.html'));
    chatDentistButton.addEventListener('click', (event) => handleButtonClick(event, 'ChatDentist.html'));  // Add similar check for "Chat a Dentist"
});








