var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotographerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: false },
    description: { type: String, required: false },
    city: { type: String, required: false },
    contactNumber: { type: String, required: false },
    upVotes: [String],
    wishlists: [String],
    buyLists: [String],
    isPremium: { type: Boolean, required: true, default: false },
    netBalance: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Photographer', PhotographerSchema);
