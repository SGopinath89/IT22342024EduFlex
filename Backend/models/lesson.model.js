const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LessonSchema = new Schema({
   title: { type: String, required: true },
   notes: { type: String, required: true },
   video: { type: String, required: true },
   quiz: { type: String, required: true },
   courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Reference to Course
  
});

const Lesson = mongoose.model('addlesson', LessonSchema);
module.exports = Lesson;