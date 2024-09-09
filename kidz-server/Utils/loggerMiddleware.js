// loggerMiddleware.js

const loggerMiddleware = (req, res, next) => {
    // Log request details
    console.log(`Accessing ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;
