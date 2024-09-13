// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Utils/configDB');
const loggerMiddleware = require('./Utils/loggerMiddleware');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
connectDB();
app.use(loggerMiddleware);

app.use(cors());
app.use(bodyParser.json());

// Use the app routes
app.use('/categories', categoryRoutes);
app.use('/cart', cartRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
