let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let clientSchema = new Schema({
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    credentials: { type: String, required: true, default: 'password' }
});

module.exports = mongoose.model('Client', clientSchema, 'Client');