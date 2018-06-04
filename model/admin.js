var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema, 'Admin');