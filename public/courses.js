document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch courses data
        const coursesResponse = await fetch('/courses');
        const coursesData = await coursesResponse.json();

        if (coursesData.success) {
            const coursesList = document.getElementById('courses-container');

            // Iterate over courses
            coursesData.courses.forEach(course => {
                // Create a card for each course
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');

                // Course title
                const courseTitle = document.createElement('h3');
                courseTitle.textContent = course.title;
                courseCard.appendChild(courseTitle);

                // Course description
                const courseDescription = document.createElement('p');
                courseDescription.textContent = course.description;
                courseCard.appendChild(courseDescription);

                // View details button
                const viewDetailsButton = document.createElement('button');
                viewDetailsButton.textContent = 'View Details';
                viewDetailsButton.addEventListener('click', () => viewCourseDetails(course._id));
                courseCard.appendChild(viewDetailsButton);

                // Edit button
                /* const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editCourse(course._id));
                courseCard.appendChild(editButton); */

                // Delete button
                /* const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteCourse(course._id));
                courseCard.appendChild(deleteButton); */

                // Append course card to the courses list
                coursesList.appendChild(courseCard);
            });
        } else {
            console.error('Error fetching courses:', coursesData.message);
        }
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
});

async function viewCourseDetails(courseId) {
    // Redirect to the course details page, passing the courseId as a query parameter
    window.location.href = `/course_details.html?id=${courseId}`;
}