const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('./models/Blog');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json()); // To handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // To handle form data
app.use(express.static('public')); // Serve static files from the public folder

// API Endpoints

// GET all blog posts
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new blog post
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({ title, content });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single blog post by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a blog post by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a blog post by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const port = 3000;
app.listen(port,
    () => console.log(`Server running at http://localhost:${port}`)
    );