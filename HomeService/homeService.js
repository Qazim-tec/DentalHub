document.getElementById('homeServiceRequestForm').onsubmit = async function (event) {
    event.preventDefault();
    
    const formData = {
        id: 0,
        fullName: document.getElementById('fullName').value,
        phoneNumber: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        homeAddress: document.getElementById('address').value,
        serviceType: document.getElementById('serviceType').value
    };

    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = '';  // Clear any previous messages

    try {
        const response = await fetch('https://dentalapi-dija.onrender.com/api/HomeService/NewHomeService', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            responseMessage.textContent = 'Request successful! We will get back to you via email or phone call for confirmation of your request.';
            responseMessage.style.color = 'green';
            document.getElementById('homeServiceRequestForm').reset();
        } else {
            responseMessage.textContent = 'Failed to submit request. Please try again.';
            responseMessage.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        responseMessage.textContent = 'An error occurred. Please try again later.';
        responseMessage.style.color = 'red';
    }
};
