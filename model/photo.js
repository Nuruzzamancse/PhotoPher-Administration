var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    name: { type: String, required: true },
    displayName: { type: String, required: true },
    originalPath: { type: String, required: true },
    watermarkedPath: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    likes: { type: Number, default: 0},
    upVote: { type: Number, required: true, default: 0 },
    upVoterList: [String],
    uploadDate: { type: Date, required: true, default: Date.now() },
    tags: [String],
    albumId: { type: String, required: true, default: 'Random' },
    ownerId: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 100 }
});

module.exports = mongoose.model('Photo', PhotoSchema, 'Photo');