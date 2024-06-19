const mongoose = require("mongoose");

const FoodTypeSchema = new mongoose.Schema({
    foodType: String
});

const FoodType = mongoose.model("Food Type", FoodTypeSchema);

module.exports = FoodType;