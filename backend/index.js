const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Configure CORS to allow requests from your React app
app.use(cors({ origin: 'http://localhost:3000' })); // Allows requests from your React app
app.use(express.json()); // Parses JSON request bodies

// Auth route
app.use('/api', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
