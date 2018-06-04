let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let CategorySchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema, 'Category');