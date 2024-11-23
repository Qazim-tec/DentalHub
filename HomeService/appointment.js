document.getElementById("appointmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageDiv = document.getElementById("message");
    messageDiv.textContent = ""; // Clear any previous message
    messageDiv.className = ""; // Reset any previous styling

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
        const response = await fetch("http://localhost:5208/api/Appointment/NewAppointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageDiv.textContent = "Appointment booked successfully! We will get back to you in a few minutes via email or call to confirm your appointment.";
            messageDiv.classList.add("success");
            event.target.reset(); // Clear the form fields
        } else {
            messageDiv.textContent = "Failed to book appointment. Please try again.";
            messageDiv.classList.add("error");
        }
    } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = "An error occurred. Please try again later.";
        messageDiv.classList.add("error");
    }
});
