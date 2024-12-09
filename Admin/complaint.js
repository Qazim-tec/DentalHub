// Replace with your actual API URLs
const GET_COMPLAINTS_URL = 'https://dentalapi-dija.onrender.com/api/Dental/GetAllcontact';
const DELETE_COMPLAINT_URL = 'https://dentalapi-dija.onrender.com/api/Dental/DeletContactById';

// Fetch and display complaints
async function fetchComplaints() {
    const loadingText = document.getElementById('loading-text');
    const container = document.getElementById('complaints-container');

    loadingText.style.display = 'block'; // Show loading text

    try {
        const response = await fetch(GET_COMPLAINTS_URL);
        if (!response.ok) throw new Error('Failed to fetch complaints');

        const complaints = await response.json();
        console.log(complaints); // Debugging to check API response

        function formatPhoneNumber(phoneNumber) {
            if (!phoneNumber) return ''; // Return empty if phoneNumber is missing
            
            // Remove non-numeric characters
            let sanitizedNumber = phoneNumber.replace(/\D/g, '');
            
            // Add a default country code (e.g., 234 for Nigeria) if the number starts with '0'
            if (sanitizedNumber.startsWith('0')) {
                sanitizedNumber = '234' + sanitizedNumber.slice(1);
            }
            
            return sanitizedNumber;
        }

        // Populate the container with complaint cards
        container.innerHTML = complaints.map(complaint => `
            <div class="complaint-card" data-id="${complaint.id}">
                <h3>${complaint.name || "Anonymous"}</h3>
                <p><strong>Email:</strong> ${complaint.email || "Not provided"}</p>
                <p><strong>Phone:</strong> ${complaint.phone || "Not provided"}</p>
                <p><strong>Complaint:</strong> ${complaint.complain || "No details"}</p>
                <div class="button-group">
                    <button class="delete-btn" onclick="deleteComplaint(${complaint.id})">Delete</button>
                    <a class="whatsapp-btn" href="https://wa.me/${complaint.phone ? formatPhoneNumber(complaint.phone) : ''}" target="_blank" title="Chat on WhatsApp">

                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a class="email-btn" href="mailto:${complaint.email}" target="_blank" title="Send Email">
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

// Delete complaint (API + frontend removal)
async function deleteComplaint(complaintId) {
    if (!confirm("Are you sure you want to delete this complaint?")) return;

    try {
        const response = await fetch(`${DELETE_COMPLAINT_URL}${complaintId}`, { 
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to delete complaint');
        }

        let result = null;
        try {
            result = await response.json();
        } catch (err) {
            console.warn('No JSON response body, but delete was likely successful.');
        }

        alert(result?.Message || 'Complaint successfully deleted');

        const card = document.querySelector(`.complaint-card[data-id="${complaintId}"]`);
        if (card) card.remove();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Load complaints on page load
fetchComplaints();
