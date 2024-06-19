const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    foodName: String,
    foodCost: Number,
    calories: Number,
    description: String,
    chain_id: mongoose.Schema.Types.ObjectId,
    foodType: mongoose.Schema.Types.ObjectId
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

module.exports = MenuItem;