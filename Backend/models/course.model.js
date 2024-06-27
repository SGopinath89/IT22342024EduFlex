const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }, // Reference to Teacher
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
});

const Course = mongoose.model('addcourse', courseSchema);
module.exports = Course;