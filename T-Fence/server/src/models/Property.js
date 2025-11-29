const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name_Property: { type: String, required: true },
    state: { type: String, required: true, unique: false },
    city: { type: String, required: true },
    address: { type: String, required: false },
    area: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    propertyCode: { type: String, required: true, unique: true },
    collaborators: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            addedAt: { type: Date, default: Date.now }
        }
    ],
    collaboratorRequests: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            requestedAt: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model("Property", PropertySchema);
