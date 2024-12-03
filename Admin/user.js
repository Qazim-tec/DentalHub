// API URLs
const getUsersUrl = 'https://dentalapi-dija.onrender.com/api/Auth/GetAllUsers';
const deleteUserUrl = 'https://dentalapi-dija.onrender.com/api/Auth/DeleteUser';

// Fetch and display users
async function fetchUsers() {
    try {
        const response = await fetch(getUsersUrl);
        const users = await response.json();

        const usersContainer = document.getElementById('users-container');
        const loadingText = document.getElementById('loading-text');

        usersContainer.innerHTML = '';  // Clear existing list
        loadingText.style.display = 'none';  // Hide loading text

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            userCard.innerHTML = `
                <h3>${user.fullName}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phoneNumber}</p>
                <p><strong>Address:</strong> ${user.homeAddress}</p>
                <button class="delete-btn" onclick="deleteUser('${encodeURIComponent(user.email)}')">Delete</button>
            `;
            usersContainer.appendChild(userCard);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Delete a user by email
async function deleteUser(email) {
    if (confirm("Are you sure you want to delete this user?")) {
        try {
            const response = await fetch(`${deleteUserUrl}/${email}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('User deleted successfully');
                fetchUsers();  // Refresh the list after deletion
            } else {
                const result = await response.json();
                alert(result.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user.');
        }
    }
}

// Initial fetch of users
fetchUsers();
