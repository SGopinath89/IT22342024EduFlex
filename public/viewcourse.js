






























/* document.addEventListener('DOMContentLoaded', () => {
    const courseId = new URLSearchParams(window.location.search).get('id');

    if (courseId) {
        fetchCourseDetails(courseId);
    }

    async function fetchCourseDetails(id) {
        try {
            const response = await fetch(`/courses/${id}`);
            const { success, course } = await response.json();

            if (success && course) {
                displayCourseDetails(course);
                fetchLessons(course._id);
            } else {
                document.getElementById('course-details').innerHTML = 'Course not found.';
            }
        } catch (error) {
            console.error('Error fetching course details:', error);
            document.getElementById('course-details').innerHTML = 'Error loading course details.';
        }
    }

    async function fetchLessons(courseId) {
        try {
            const response = await fetch(`/courses/${courseId}/lessons`);
            const { success, lessons } = await response.json();

            if (success && lessons) {
                displayLessons(lessons);
            } else {
                document.getElementById('lessons-list').innerHTML = 'No lessons found.';
            }
        } catch (error) {
            console.error('Error fetching lessons:', error);
            document.getElementById('lessons-list').innerHTML = 'Error loading lessons.';
        }
    }

    function displayCourseDetails(course) {
        const courseDetailsDiv = document.getElementById('course-details');
        courseDetailsDiv.innerHTML = `
            <h2>${course.title}</h2>
            <p>${course.description}</p>
        `;
    }

    function displayLessons(lessons) {
        const lessonsListDiv = document.getElementById('lessons-list');
        lessonsListDiv.innerHTML = lessons.map(lesson => `
            <div class="lesson">
                <h4>${lesson.title}</h4>
                <p>${lesson.notes}</p>
                <p><a href="${lesson.video}" target="_blank">Watch Video</a></p>
            </div>
        `).join('');
    }
});
 */