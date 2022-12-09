const mongoose = require("mongoose");

const uri ="mongodb+srv://Vinoth:Q7VrJviuvNqapxFG@blackspy.bu4yzy0.mongodb.net/blackspy?retryWrites=true&w=majority";

const connectDB = () => {
    console.log("success");
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDB;