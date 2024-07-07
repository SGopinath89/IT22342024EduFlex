document.addEventListener('DOMContentLoaded', async () => {
    const courseId = '668a3919c64e52a0fb0b9773'; // Replace with actual course ID
    const courseContainer = document.getElementById('course-container');

    try {
        const response = await fetch(`/course/${courseId}`);
        const course = await response.json();

        if (course) {
            const { title, description, materials } = course;

            const courseHtml = `
                <h2>${title}</h2>
                <p>${description}</p>
                ${materials.map(material => `
                    <div class="material-item">
                        <h3>Lesson Notes:</h3>
                        <a href="${material.notesUrl}" target="_blank">${material.notesUrl}</a>
                        <h3>Lesson Video:</h3>
                        <a href="${material.videoUrl}" target="_blank">${material.videoUrl}</a>
                        <h3>Lesson Quiz:</h3>
                        <a href="${material.quizUrl}" target="_blank">${material.quizUrl}</a>
                    </div>
                `).join('')}
            `;

            courseContainer.innerHTML = courseHtml;
        }
    } catch (error) {
        console.error('Error fetching course:', error);
        courseContainer.innerHTML = '<p>Error loading course material.</p>';
    }
});



