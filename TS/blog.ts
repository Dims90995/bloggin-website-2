const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // Adjust the path as necessary