var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    upVote: { type: Number, required: true, default: 0 },
    uploadDate: { type: Date, required: true, default: Date.now() },
    updateDate: [Date],
    tags: [String],
    ownerId: { type: String, required: true },
    isPrivate: { type: Boolean, required: true, default: false },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Album', AlbumSchema, 'Album');