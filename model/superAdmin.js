var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuperAdminSchema = new Schema({
    name: { type: String, required: true }
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema, 'SuperAdmin');