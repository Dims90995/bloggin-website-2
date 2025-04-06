var form = document.getElementById('newBlogForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var titleElement = document.getElementById('title');
        var contentElement = document.getElementById('content');
        if (titleElement && contentElement) {
            var title = titleElement.value;
            var content = contentElement.value;
            fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, content: content })
            })
                .then(function (response) {
                if (response.ok) {
                    alert('Blog post created successfully.');
                }
                else {
                    alert('Failed to create blog post.');
                }
            })["catch"](function (error) { return console.error('Error:', error); });
        }
        else {
            alert('Title or content input not found.');
        }
    });
}
;
