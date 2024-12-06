window.addEventListener('DOMContentLoaded', () => {
    const userFullName = localStorage.getItem('userFullName'); // Retrieve the full name from localStorage
    const loginButton = document.getElementById('loginButton'); // Find the login button

    // Check if the login button exists on the page
    if (!loginButton) {
        console.error('Login button not found on the page.');
        return;
    }

    if (userFullName) {
        // Create a welcome message element
        const welcomeMessage = document.createElement('span');
        welcomeMessage.textContent = `Welcome, ${userFullName}`; // Display the full name
        welcomeMessage.style.cursor = 'pointer'; // Add cursor pointer for a clickable feel

        // Replace the "Sign In" button with the welcome message
        loginButton.replaceWith(welcomeMessage);

        // Add a click event listener for logout confirmation
        welcomeMessage.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                // Clear the user details from localStorage
                localStorage.removeItem('userFullName');
                localStorage.removeItem('userEmail');
                
                // Redirect to the login page (or sign-up page as you have it)
                window.location.href = 'index.html'; // Redirect to the login page
            }
            else{
                window.location.href = 'index.html';

            }
        });
    } else {
        // Optional: you can show a message on the page instead of just logging an error
        console.error('User full name not found in localStorage.');
        // You can also display a message in the UI if needed, like:
        // document.body.innerHTML = "<p>You are not logged in. Please sign in.</p>";
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








