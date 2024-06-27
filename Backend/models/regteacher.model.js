const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
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
    qualification: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'teacher'
      }
    
    
});

teacherSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Teacher = mongoose.model('regteachers', teacherSchema);
module.exports = Teacher; 