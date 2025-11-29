const mongoose = require("mongoose");

const FenceSchema = new mongoose.Schema({
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Propeerty', required: true },
    name: { type: String, required: true},
    status: { type: Boolean, required: true},
    coordinates: [{ latitude: String, longitude: String }],
});

module.exports = mongoose.model("Fence", FenceSchema);
