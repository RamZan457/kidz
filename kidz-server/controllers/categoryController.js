// controllers/categoryController.js
const { encodeKey } = require('../Utils/generateEncoded');
const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const nowTime = Date.now() + Math.round(Math.random() * 1000).toString();
        const cartKey = encodeKey(nowTime);

        const data = {
            cartKey,
            categories
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single category by name
exports.getCategoryByName = async (req, res) => {
    try {
        const category = await Category.findOne({ name: req.params.name });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, icon, color } = req.body;
    const category = new Category({
        name,
        icon,
        color
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
    const { name, icon, color } = req.body;

    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (name) category.name = name;
        if (icon) category.icon = icon;
        if (color) category.color = color;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.remove();
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};