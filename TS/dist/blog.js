var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, "default": Date.now }
});
module.exports = mongoose.model('Blog', blogSchema);
var express = require('express');
var router = express.Router();
var Blog = require('../models/blog'); // Adjust the path as necessary
