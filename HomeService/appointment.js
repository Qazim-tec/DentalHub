document.getElementById("appointmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageDiv = document.getElementById("message");
    messageDiv.textContent = ""; // Clear any previous message
    messageDiv.className = ""; // Reset any previous styling

    // Create and append the spinner to the messageDiv
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    messageDiv.appendChild(spinner);

    // Show the spinner
    spinner.style.display = "inline-block";

    const formData = {
        id: 0, // Set to 0 or an appropriate value as per your API requirements
        fullName: document.getElementById("fullName").value,
        phoneNumber: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        homeAddress: document.getElementById("address").value,
        appointmentDate: document.getElementById("appointmentDate").value,
        preferedTime: document.getElementById("appointmentTime").value,
        serviceType: document.getElementById("serviceType").value
    };

    try {
        const response = await fetch("https://dentalapi-dija.onrender.com/api/Appointment/NewAppointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Hide spinner once response is received
        spinner.style.display = "none";

        if (response.ok) {
            messageDiv.textContent = "Appointment booked successfully! We will get back to you in a few minutes via email or call to confirm your appointment.";
            messageDiv.classList.add("success");
            event.target.reset(); // Clear the form fields
        } else {
            messageDiv.textContent = "Failed to book appointment. Please try again.";
            messageDiv.classList.add("error");
        }
    } catch (error) {
        // Hide spinner in case of an error
        spinner.style.display = "none";
        console.error("Error:", error);
        messageDiv.textContent = "An error occurred. Please try again later.";
        messageDiv.classList.add("error");
    }
});
