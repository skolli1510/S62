const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Hardcoded credentials for testing
const VALID_USERNAME = 'Sushma';
const VALID_PASSWORD = 'Sushma';

// Import Mongoose models
const SolarGeneration = require('../models/SolarGeneration');
const MonthlySolarData = require('../models/MonthlySolarData');

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '3m' });
        console.log('Generated token:', token); // Log the token
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Dashboard route
router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome to the Dashboard!' });
});

// GET route for solar generation data
router.get('/solar-generation', authenticateToken, async (req, res) => {
    try {
        console.log("Fetching solar generation data");
        const data = await SolarGeneration.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching solar generation data:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET route for monthly solar generation data
router.get('/monthly-solar-generation', authenticateToken, async (req, res) => {
    try {
        console.log("Fetching solar generation data for every month");
        const data = await MonthlySolarData.find({});
        res.json(data);
    } catch (error) {
        console.error("Error fetching monthly solar generation data:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
