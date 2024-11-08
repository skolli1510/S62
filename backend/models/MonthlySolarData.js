const mongoose = require('mongoose');

const monthlySolarDataSchema = new mongoose.Schema({
    month: String,
    generation: Number
});

module.exports = mongoose.model('MonthlySolarData', monthlySolarDataSchema);
