const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    /* cpassword: {
        type: String,
        required: true
    }, */
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
    },
    college: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
      }
    
});

studentSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});   

const Students = mongoose.model('regstudents', studentSchema);
module.exports = Students;