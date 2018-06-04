var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecruiterSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Recruiter', RecruiterSchema, 'Recruiter');