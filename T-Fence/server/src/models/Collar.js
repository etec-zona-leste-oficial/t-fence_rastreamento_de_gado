const mongoose = require("mongoose");

const CollarSchema = new mongoose.Schema({
  mec: { type: String, required: true },
  name_collar: { type: String, required: true },
  fence_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Fence', required: false },
  status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Inactive' },
  property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  animal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: false },
  location: [{ latitude: Number , longitude: Number }],
  battery: { type: Number, required: false },
  rssi: { type: String, required: false }
});

module.exports = mongoose.model("Collar", CollarSchema);
