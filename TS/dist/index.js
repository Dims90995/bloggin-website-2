document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/blogs')
        .then(function (response) { return response.json(); })
        .then(function (blogs) {
        var blogList = document.getElementById('blogList');
        blogs.forEach(function (blog) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = "show.html?id=" + blog._id;
            a.textContent = blog.title;
            li.appendChild(a);
            if (blogList) {
                blogList.appendChild(li);
            }
            else {
                console.error('Error: blogList element not found');
            }
        });
    })["catch"](function (error) { return console.error('Error fetching blogs:', error); });
});
