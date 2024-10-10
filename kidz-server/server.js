// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Utils/configDB');
const loggerMiddleware = require('./Utils/loggerMiddleware');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
require('dotenv').config()

const app = express();
connectDB();
app.use(loggerMiddleware);

app.use(cors());
app.use(bodyParser.json());

// Use the app routes
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
