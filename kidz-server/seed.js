// seed.js
const mongoose = require('mongoose');
const connectDB = require('./Utils/configDB');
const Category = require('./models/Category');

connectDB();

const seedCategories = async () => {
    const categories = [
        { name: 'Clothing', categorySlug: 'clothing' , icon: 'https://via.placeholder.com/150', color: '#FFD700' },
        { name: 'Toys', categorySlug: 'toys', icon: 'https://via.placeholder.com/150', color: '#FF69B4' },
        { name: 'Books', categorySlug: 'books', icon: 'https://via.placeholder.com/150', color: '#87CEEB' },
        { name: 'Shoes', categorySlug: 'shoes', icon: 'https://via.placeholder.com/150', color: '#FF6347' },
        { name: 'Accessories', categorySlug: 'accessories', icon: 'https://via.placeholder.com/150', color: '#FFA07A' }
    ];

    try {
        await Category.insertMany(categories);
        console.log('Data Seeded');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

seedCategories();
