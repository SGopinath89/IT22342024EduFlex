// models/session.model.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    courseId: { type: String, required: true },  // Assuming courseId is a string for simplicity
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
