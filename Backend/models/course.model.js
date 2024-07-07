const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    notesUrl: String,
    videoUrl: String,
    quizUrl: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    materials: [materialSchema]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

