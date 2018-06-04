let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let MessageSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: Date.now() },
    senderName: { type: String, required: true },
    senderPhoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema, 'Message');