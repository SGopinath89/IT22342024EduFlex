document.getElementById('add-course-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const title = document.querySelector('input[name="course-title"]').value;
    const description = document.querySelector('textarea[name="course-description"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const image = document.querySelector('input[name="course-image"]').files[0]; // Get the selected image file

    if (!title || !description || !email || !image) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        const response = await fetch('/addcourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, email, image })
        });

        const result = await response.json();
        if (result.success) {
            alert('Course added successfully!');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error adding course:', error);
    }
});

//dropdown
document.addEventListener('DOMContentLoaded', function () {
    fetch('/courses')
       //  .then(response => response.json()) 

       .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
          })
        .then(data => {
            if (data.success) {
                const courseDropdown = document.getElementById('select-course');
                data.courses.forEach(course => {
                    const option = document.createElement('option');
                    option.value = course._id;
                    option.text = course.title;
                    courseDropdown.appendChild(option);
           /*  const courseDropdown = document.getElementById('select-course');
            data.courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course._id;
                option.text = course.title;
                courseDropdown.appendChild(option); */
            });
        }else{
            console.error('Error fetching courses:', data.message);
        }
    })
        .catch(error => console.error('Error fetching courses:', error));
});

 


document.getElementById('add-lesson-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const courseId = document.getElementById('select-course').value; 

       // Ensure courseId is a valid ObjectId
   /*     if (!isValidObjectId(courseId)) {
        console.error('Invalid courseId:', courseId);
        return;
    } */

    // Get the lesson details from the form fields
    const title = document.getElementById('lesson-title').value;
    const notes = document.getElementById('lesson-notes').value;
    const video = document.getElementById('lesson-video').value;
    const quiz = document.getElementById('lesson-quiz').value;

    try {
        // Make a POST request to add the lesson to the course
        const response = await fetch(`/courses/${courseId}/lessons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, notes, video, quiz })
        });

        const result = await response.json();
        if (result.success) {
            alert('Lesson added successfully!');
           // window.location.href = `course_details.html?courseId=${courseId}`;
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error adding lesson:', error);
    }

});

