// Replace with your actual API URLs
const GET_APPOINTMENTS_URL = 'https://dentalapi-dija.onrender.com/api/Appointment/GetAllAppointment';
const DELETE_APPOINTMENT_URL = 'https://dentalapi-dija.onrender.com/api/Appointment/DeleteAppointmentByID';

// Fetch and display appointments
async function fetchAppointments() {
    const loadingText = document.getElementById('loading-text');
    const container = document.getElementById('appointments-container');

    loadingText.style.display = 'block'; // Show loading text

    try {
        const response = await fetch(GET_APPOINTMENTS_URL);
        if (!response.ok) throw new Error('Failed to fetch appointments');

        const appointments = await response.json();
        console.log(appointments); // Debugging to check API response

        // Populate the container with appointment cards
        container.innerHTML = appointments.map(appointment => `
            <div class="appointment-card" data-id="${appointment.id}">
                <h3>${appointment.fullName || "Anonymous"}</h3>
                <p><strong>Service Type:</strong> ${appointment.serviceType || "Not specified"}</p>
                <p><strong>Phone:</strong> ${appointment.phoneNumber || "Not provided"}</p>
                <p><strong>Email:</strong> ${appointment.email || "Not provided"}</p>
                <p><strong>Address:</strong> ${appointment.homeAddress || "Not provided"}</p>
                <p><strong>Appointment Date:</strong> ${appointment.appointmentDate || "Not provided"}</p>
                <p><strong>Preferred Time:</strong> ${appointment.preferedTime || "Not provided"}</p>
                <div class="button-group">
                    <button class="delete-btn" onclick="deleteAppointment(${appointment.id})">Delete</button>
                    <a class="whatsapp-btn" href="https://wa.me/${appointment.phoneNumber}" target="_blank" title="Chat on WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a class="email-btn" href="mailto:${appointment.email}" target="_blank" title="Send Email">
                        <i class="fas fa-envelope"></i>
                    </a>
                </div>
            </div>
        `).join('');

        loadingText.style.display = 'none'; // Hide loading text once data is loaded
    } catch (error) {
        loadingText.textContent = `Error: ${error.message}`;
    }
}

// Delete appointment (API + frontend removal)
async function deleteAppointment(appointmentId) {
    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
        const response = await fetch(`${DELETE_APPOINTMENT_URL}${appointmentId}`, { 
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to delete appointment');
        }

        let result = null;
        try {
            result = await response.json();
        } catch (err) {
            console.warn('No JSON response body, but delete was likely successful.');
        }

        alert(result?.Message || 'Appointment successfully deleted');

        // Remove the appointment card from the frontend
        const card = document.querySelector(`.appointment-card[data-id="${appointmentId}"]`);
        if (card) card.remove();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Load appointments on page load
fetchAppointments();
