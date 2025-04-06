// Function to get query parameters from the URL
function getQueryParameter(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
  
  document.addEventListener('DOMContentLoaded', function() {
    const blogId = getQueryParameter('id');
    if (!blogId) {
      alert('Invalid blog ID');
      return;
    }
  
    // Fetch current blog details
    fetch(`/api/blogs/${blogId}`)
      .then(response => response.json())
      .then(blog => {
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentElement = document.getElementById('content') as HTMLInputElement | null;
        if (titleElement && contentElement) {
          titleElement.value = blog.title;
          contentElement.value = blog.content;
        }
      })
      .catch(error => console.error('Error fetching blog:', error));
  
    // Handle form submission for update
    const formElement = document.getElementById('editBlogForm') as HTMLFormElement | null;
    if (formElement) {
      formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const titleElement = document.getElementById('title') as HTMLInputElement | null;
        const contentElement = document.getElementById('content') as HTMLInputElement | null;
        if (titleElement && contentElement) {
          const title = titleElement.value;
          const content = contentElement.value;
  
          fetch(`/api/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
          })
          .then(response => {
            if (response.ok) {
              window.location.href = `show.html?id=${blogId}`;
            } else {
              alert('Error updating blog post.');
            }
          })
          .catch(error => console.error('Error:', error));
        }
      });
    }
  });
  