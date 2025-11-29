const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema({
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  name: { type: String, required: true},
  identifier: {type: String, required: true},
});

module.exports = mongoose.model("Animal", AnimalSchema);
