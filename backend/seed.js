const mongoose = require('mongoose');
require('dotenv').config();
const SolarGeneration = require('./models/SolarGeneration');
const MonthlySolarData = require('./models/MonthlySolarData');

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
});

const solarGenerationData = [
    { state: "California", generation: 68816 },
    { state: "Texas", generation: 31739 },
    { state: "Florida", generation: 17809 },
    { state: "North Carolina", generation: 12085 },
    { state: "Arizona", generation: 11778 },
    { state: "Other States", generation: 95864 }
];

const monthlySolarData = [
    { month: "January", generation: 12500 },
    { month: "February", generation: 14400 },
    { month: "March", generation: 17809 },
    { month: "April", generation: 22150 },
    { month: "May", generation: 24200 },
    { month: "June", generation: 25000 },
    { month: "July", generation: 26626 },
    { month: "August", generation: 25300 },
    { month: "September", generation: 22500 },
    { month: "October", generation: 20600 },
    { month: "November", generation: 16500 },
    { month: "December", generation: 15000 }
];

const seedData = async () => {
    await SolarGeneration.deleteMany({});
    await MonthlySolarData.deleteMany({});
    await SolarGeneration.insertMany(solarGenerationData);
    await MonthlySolarData.insertMany(monthlySolarData);
    console.log('Database seeded');
    mongoose.connection.close();
};

seedData();
