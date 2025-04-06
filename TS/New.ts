const form = document.getElementById('newBlogForm');
if (form) {
  form.addEventListener('submit', function(e: SubmitEvent) {
    e.preventDefault();
    const titleElement = document.getElementById('title') as HTMLInputElement | null;
    const contentElement = document.getElementById('content') as HTMLInputElement | null;

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
            alert('Blog post created successfully.');
          } else {
            alert('Failed to create blog post.');
          }
        })
        .catch((error) => console.error('Error:', error));
    } else {
      alert('Title or content input not found.');
    }
  })};
  