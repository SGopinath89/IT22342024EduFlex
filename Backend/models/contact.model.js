/* // contact.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Contact Schema
const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

// Create the Contact model
const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
 */