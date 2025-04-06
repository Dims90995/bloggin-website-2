document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/blogs')
      .then(response => response.json())
      .then(blogs => {
        const blogList = document.getElementById('blogList');
        blogs.forEach(blog => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `show.html?id=${blog._id}`;
          a.textContent = blog.title;
          li.appendChild(a);
          if (blogList) {
            blogList.appendChild(li);
          } else {
            console.error('Error: blogList element not found');
          }
        });
      })
      .catch(error => console.error('Error fetching blogs:', error));
  });
  