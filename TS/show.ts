// Removed duplicate implementation of getQueryParam
  document.addEventListener('DOMContentLoaded', function() {
    const blogId = getQueryParam('id');
    if (!blogId) {
      const blogContainer = document.getElementById('blogContainer');
      if (blogContainer) {
        blogContainer.innerHTML = '<p>Invalid blog ID</p>';
      }
      return;
    }
  
    fetch(`/api/blogs/${blogId}`)
      const container = document.getElementById('blogContainer');
      if (container) {
        fetch(`/api/blogs/${blogId}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch blog');
            }
            return response.json();
          })
          .then((blog) => {
            container.innerHTML = `<h1>${blog.title}</h1>
                                   <p>${blog.content}</p>
                                   <a href="edit.html?id=${blog._id}">Edit</a>
                                   <button id="deleteBtn">Delete</button>`;
            const deleteBtn = document.getElementById('deleteBtn');
            deleteBtn?.addEventListener('click', function () {
              if (confirm('Are you sure you want to delete this blog post?')) {
                fetch(`/api/blogs/${blogId}`, {
                  method: 'DELETE',
                })
                  .then((response) => {
                    if (response.ok) {
                      window.location.href = 'index.html';
                    } else {
                      alert('Error deleting blog post.');
                    }
                  })
                  .catch((error) => {
                    console.error('Error deleting blog:', error);
                    alert('Error deleting blog post.');
                  });
              }
            });
          })
          .catch((error) => {
            console.error('Error fetching blog:', error);
            container.innerHTML = '<p>Error loading blog post</p>';
          });
      } else {
          console.error('Blog container not found');
        }
      });
  