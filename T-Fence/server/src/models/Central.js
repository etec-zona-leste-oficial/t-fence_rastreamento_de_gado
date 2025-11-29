const mongoose = require("mongoose");

const CentralSchema = new mongoose.Schema({
  mac_id:  { type: String, required: true, unique: true},
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  status: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = mongoose.model("Central", CentralSchema);
