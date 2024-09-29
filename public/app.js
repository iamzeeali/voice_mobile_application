document.addEventListener('DOMContentLoaded', () => {
    const fetchUsersBtn = document.getElementById('fetchUsersBtn');
    const userList = document.getElementById('userList');
    const offlineWarning = document.getElementById('offlineWarning');
    const userForm = document.getElementById('userForm');
    const userNameInput = document.getElementById('userName');

    // Fetch users from the backend API
    fetchUsersBtn.addEventListener('click', async () => {
        await fetchUsers();
    });

    // Add user form submission handler
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userName = userNameInput.value.trim();
        if (!userName) return;

        try {
            // Send POST request to the backend to add a new user
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: userName })
            });

            if (response.ok) {
                userNameInput.value = '';  // Clear input field
                await fetchUsers();        // Fetch the updated user list
            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    });

    // Function to fetch users from the backend
    async function fetchUsers() {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();

            userList.innerHTML = '';  // Clear the list
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.id}: ${user.name}`;
                userList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Handle offline detection
    window.addEventListener('online', () => offlineWarning.classList.remove('offline'));
    window.addEventListener('offline', () => offlineWarning.classList.add('offline'));
});