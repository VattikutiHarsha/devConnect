const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect("mongodb+srv://VattikutiHarsha:VattikutiHarsha@cluster0.hvxjg.mongodb.net/devConnect");
};

module.exports = connectDB;