// Replace with your actual API URLs
const GET_SERVICES_URL = 'https://dentalapi-dija.onrender.com/api/HomeService/GetAllHomeService';
const DELETE_SERVICE_URL = 'https://dentalapi-dija.onrender.com/api/HomeService/DeleteHomeServiveById';

// Fetch and display services
async function fetchServices() {
    const loadingText = document.getElementById('loading-text');
    const container = document.getElementById('services-container');

    loadingText.style.display = 'block'; // Show loading text

    try {
        const response = await fetch(GET_SERVICES_URL);
        if (!response.ok) throw new Error('Failed to fetch services');

        const services = await response.json();
        console.log(services); // Debugging to check API response

        // Populate the container with service cards
        container.innerHTML = services.map(service => `
            <div class="service-card" data-id="${service.id}">
                <h3>${service.fullName || "Anonymous"}</h3>
                <p><strong>Service Type:</strong> ${service.serviceType || "Not specified"}</p>
                <p><strong>Phone:</strong> ${service.phoneNumber || "Not provided"}</p>
                <p><strong>Email:</strong> ${service.email || "Not provided"}</p>
                <p><strong>Address:</strong> ${service.homeAddress || "Not provided"}</p>
                <div class="button-group">
                    <button class="delete-btn" onclick="deleteService(${service.id})">Delete</button>
                    <a class="whatsapp-btn" href="https://wa.me/${service.phoneNumber}" target="_blank" title="Chat on WhatsApp">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <a class="email-btn" href="mailto:${service.email}" target="_blank" title="Send Email">
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

// Delete service (API + frontend removal)
async function deleteService(serviceId) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
        const response = await fetch(`${DELETE_SERVICE_URL}${serviceId}`, { 
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to delete service');
        }

        let result = null;
        try {
            result = await response.json();
        } catch (err) {
            console.warn('No JSON response body, but delete was likely successful.');
        }

        alert(result?.Message || 'Service successfully deleted');

        // Remove the service card from the frontend
        const card = document.querySelector(`.service-card[data-id="${serviceId}"]`);
        if (card) card.remove();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Load services on page load
fetchServices();
