const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Hardcoded credentials for testing
const VALID_USERNAME = 'Sushma';
const VALID_PASSWORD = 'Sushma';

// Solar generation data
const solarGenerationData = [
    { state: "California", generation: 68816 },
    { state: "Texas", generation: 31739 },
    { state: "Florida", generation: 17809 },
    { state: "North Carolina", generation: 12085 },
    { state: "Arizona", generation: 11778 },
    { state: "Other States", generation: 95864 }
];

const monthlySolarData = [
    { Month: "January", generation: 12500 },
    { Month: "February", generation: 14400 },
    { Month: "March", generation: 17809 },
    { Month: "April", generation: 22150 },
    { Month: "May", generation: 24200 },
    { Month: "June", generation: 25000 },
    { Month: "July", generation: 26626 },
    { Month: "August", generation: 25300 },
    { Month: "September", generation: 22500 },
    { Month: "October", generation: 20600 },
    { Month: "November", generation: 16500 },
    { Month: "December", generation: 15000 }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
router.get('/solar-generation', authenticateToken, (req, res) => {
    console.log("Fetching solar generation data");
    res.json(solarGenerationData);
});

router.get('/monthly-solar-generation',authenticateToken, (req, res) => {
    console.log("Fetching solar generation data for Every Month");
    res.json(monthlySolarData);
});

module.exports = router;
