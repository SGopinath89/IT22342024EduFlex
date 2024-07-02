document.addEventListener('DOMContentLoaded', () => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (userDetails) {
        document.getElementById('student-username').textContent = userDetails.uname;
        document.getElementById('student-name').textContent = userDetails.name;
        document.getElementById('student-email').textContent = userDetails.email;

        fetch(`/courses/enrolled/${userDetails.email}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const coursesList = document.getElementById('student-courses-list');
                    coursesList.innerHTML = '';

                    data.courses.forEach(course => {
                        const listItem = document.createElement('li');
                        listItem.textContent = course.title;
                        coursesList.appendChild(listItem);
                    });
                } else {
                    console.error('Failed to fetch enrolled courses:', data.message);
                }
            })
            .catch(error => console.error('Error fetching enrolled courses:', error));
    } else {
        console.error('No user details found in local storage.');
        // Redirect to login page or handle accordingly
    }

    // Logout button functionality
    document.getElementById('logout-button').addEventListener('click', () => {
        // Clear user data from localStorage
        localStorage.removeItem('userDetails');
        // Redirect to logout page
        window.location.href = 'logout.html';
    });

});