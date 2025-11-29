const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    name_animal: { type: String, required: true },
    name_collar: { type: String, required: true },
    collar_id: { type: mongoose.Schema.Types.ObjectId, ref: "Collar", required: true },
    fence_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fence", required: true },
    type: { type: String, enum: ["OUT_OF_BOUNDS", "RETURNED", "LOW_BATTERY"], required: true },
    message: { type: String, required: true },
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    timestamp: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Alert", AlertSchema);
