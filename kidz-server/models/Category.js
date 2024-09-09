// models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categorySlug: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create an index on the name field
CategorySchema.index({ name: 1 });

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
