let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let FeedbackSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', FeedbackSchema, 'Feedback');