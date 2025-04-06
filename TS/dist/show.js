// Removed duplicate implementation of getQueryParam
document.addEventListener('DOMContentLoaded', function () {
    var blogId = getQueryParam('id');
    if (!blogId) {
        var blogContainer = document.getElementById('blogContainer');
        if (blogContainer) {
            blogContainer.innerHTML = '<p>Invalid blog ID</p>';
        }
        return;
    }
    fetch("/api/blogs/" + blogId);
    var container = document.getElementById('blogContainer');
    if (container) {
        fetch("/api/blogs/" + blogId)
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to fetch blog');
            }
            return response.json();
        })
            .then(function (blog) {
            container.innerHTML = "<h1>" + blog.title + "</h1>\n                                   <p>" + blog.content + "</p>\n                                   <a href=\"edit.html?id=" + blog._id + "\">Edit</a>\n                                   <button id=\"deleteBtn\">Delete</button>";
            var deleteBtn = document.getElementById('deleteBtn');
            deleteBtn === null || deleteBtn === void 0 ? void 0 : deleteBtn.addEventListener('click', function () {
                if (confirm('Are you sure you want to delete this blog post?')) {
                    fetch("/api/blogs/" + blogId, {
                        method: 'DELETE'
                    })
                        .then(function (response) {
                        if (response.ok) {
                            window.location.href = 'index.html';
                        }
                        else {
                            alert('Error deleting blog post.');
                        }
                    })["catch"](function (error) {
                        console.error('Error deleting blog:', error);
                        alert('Error deleting blog post.');
                    });
                }
            });
        })["catch"](function (error) {
            console.error('Error fetching blog:', error);
            container.innerHTML = '<p>Error loading blog post</p>';
        });
    }
    else {
        console.error('Blog container not found');
    }
});
