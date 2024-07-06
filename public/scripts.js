document.getElementById('add-session-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch('/addsession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId, title, description })
    });

    const result = await response.json();

    if (result.success) {
        const linkElement = document.getElementById('session-link');
        linkElement.innerHTML = `Session created! Join link: <a href="${result.link}" target="_blank">${result.link}</a>`;
    } else {
        alert('Failed to create session: ' + result.message);
    }
});
