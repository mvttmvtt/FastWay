const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
    address: Number,
    street: String,
    city: String,
    state: String,
    zipCode: Number,
    chain_id: mongoose.Schema.Types.ObjectId
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;