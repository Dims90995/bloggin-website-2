function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
document.addEventListener('DOMContentLoaded', function () {
    var blogId = getQueryParam('id');
    if (!blogId) {
        alert('Invalid blog ID');
        return;
    }
    // Fetch current blog details
    fetch("/api/blogs/" + blogId)
        .then(function (response) { return response.json(); })
        .then(function (blog) {
        var titleElement = document.getElementById('title');
        var contentElement = document.getElementById('content');
        if (titleElement && contentElement) {
            titleElement.value = blog.title;
            contentElement.value = blog.content;
        }
    })["catch"](function (error) { return console.error('Error fetching blog:', error); });
    // Handle form submission for update
    var formElement = document.getElementById('editBlogForm');
    if (formElement) {
        formElement.addEventListener('submit', function (e) {
            e.preventDefault();
            var titleElement = document.getElementById('title');
            var contentElement = document.getElementById('content');
            if (titleElement && contentElement) {
                var title = titleElement.value;
                var content = contentElement.value;
                fetch("/api/blogs/" + blogId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: title, content: content })
                })
                    .then(function (response) {
                    if (response.ok) {
                        window.location.href = "show.html?id=" + blogId;
                    }
                    else {
                        alert('Error updating blog post.');
                    }
                })["catch"](function (error) { return console.error('Error:', error); });
            }
        });
    }
});
