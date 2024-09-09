// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Routes for handling category requests
router.get('/get-categories', categoryController.getCategories);
router.get('/get-category/:name', categoryController.getCategoryByName);
router.post('/create-category', categoryController.createCategory);
router.put('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router