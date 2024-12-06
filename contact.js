document.getElementById('contactForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from submitting the traditional way

  const feedback = document.getElementById('feedback');
  const error = document.getElementById('error');
  
  // Hide any previous feedback or errors
  feedback.style.display = 'none';
  error.style.display = 'none';

  // Create and append the spinner to the feedback section
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  feedback.appendChild(spinner);

  // Show the spinner
  spinner.style.display = 'inline-block';

  // Collect the form data
  const data = {
    id: 0,  // Assuming id is auto-generated or not needed, so set to 0
    name: document.getElementById('Name').value,
    email: document.getElementById('Email').value,
    phone: document.getElementById('Number').value,
    complain: document.getElementById('textarea').value
  };

  try {
    const response = await fetch('https://dentalapi-dija.onrender.com/api/Dental/NewContactUs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Hide the spinner once the response is received
    spinner.style.display = 'none';

    if (response.ok) {
      feedback.style.display = 'block';
      document.getElementById('contactForm').reset(); // Reset form fields
    } else {
      error.style.display = 'block';
      const errorData = await response.json();
      console.error("Server error details:", errorData);
    }
  } catch (fetchError) {
    // Hide the spinner in case of an error
    spinner.style.display = 'none';
    error.style.display = 'block';
    console.error("Fetch error:", fetchError);
  }
});
