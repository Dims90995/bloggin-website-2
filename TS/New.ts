const form = document.getElementById('newBlogForm') as HTMLFormElement | null;

if (form) {
  form.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const titleElement = document.getElementById('title') as HTMLInputElement | null;
    const contentElement = document.getElementById('content') as HTMLTextAreaElement | null;

    if (titleElement && contentElement) {
      const title = titleElement.value;
      const content = contentElement.value;

      fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      })
        .then(response => {
          if (response.ok) {
            // Redirect or show success message
            window.location.href = '/index.html';
          } else {
            alert('Failed to create blog post.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while creating the post.');
        });
    } else {
      alert('Title or content input not found.');
    }
  });
}
