console.log('--- SERVER STARTING: DEBUG VERSION 2 ---');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
    origin: '*', // In production, replace with your Vercel URL
    credentials: true
}));
app.use(express.json());

// MongoDB Connection
const mongodb_uri = process.env.MONGODB_URI;
if (mongodb_uri) {
    // Mask password for safe logging
    const maskedUri = mongodb_uri.replace(/:([^@]+)@/, ":****@");
    console.log(`Attempting to connect to: ${maskedUri}`);

    mongoose.connect(mongodb_uri)
        .then(() => console.log('MongoDB Connected Successfully'))
        .catch(err => {
            console.error('MongoDB Connection Error Details:');
            console.error(err);
            if (err.message.includes('ECONNREFUSED')) {
                console.log('\nTIP: This usually means:');
                console.log('1. Your IP is not whitelisted in MongoDB Atlas.');
                console.log('2. Your network/ISP is blocking the connection.');
                console.log('3. There is a DNS issue with the SRV record.');
            }
        });
} else {
    console.warn('WARNING: MONGODB_URI is not defined in environment variables.');
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/purchases', require('./routes/purchases'));

// Root route
app.get('/api', (req, res) => {
    res.send('Smart Stock Optimization API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Export for Vercel
module.exports = app;
