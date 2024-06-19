const mongoose = require("mongoose");

const ChainSchema = new mongoose.Schema({
    chain_name: String
});

const Chain = mongoose.model("Chain", ChainSchema);

module.exports = Chain;