// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Utils/configDB');
const loggerMiddleware = require('./Utils/loggerMiddleware');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
connectDB();
app.use(loggerMiddleware);

app.use(cors());
app.use(bodyParser.json());

// Use the category routes
app.use('/categories', categoryRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
