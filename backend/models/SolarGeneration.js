const mongoose = require('mongoose');

const solarGenerationSchema = new mongoose.Schema({
    state: String,
    generation: Number
});

module.exports = mongoose.model('SolarGeneration', solarGenerationSchema);
