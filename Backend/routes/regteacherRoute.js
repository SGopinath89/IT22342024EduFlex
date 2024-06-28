/*const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
//const cors = require('cors');
const Student = require('./models/regstudent.model');
const Teacher = require('./models/regteacher.model');
const Course = require('./models/course.model');
const Lesson = require('./models/lesson.model');
*/
/* *******REGISTER TEACHERS******* */
/*router.get('/regteachers',(req,res) => {
    res.sendFile(path.join(intialPath,"reg_teacher.html"));
})

app.post('/regteachers', async (req, res) => {
    const { name, uname, password, cpassword, email, age, qualification } = req.body;

    if (!validateUsername(uname)) {
        return res.status(400).json({ success: false, message: 'Invalid username.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: 'Invalid password.' });
    }

    if (password !== cpassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }

    try {
        const existingUser = await Teacher.findOne({ uname });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }*/

        /*  const hashedPassword = await bcrypt.hash(password, 10);  */
      /*  const teacher = new Teacher({ name, uname, password*//*  : hashedPassword */ /*, email, age, qualification });
        await teacher.save();
        res.status(200).json({ success: true, teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});



module.exports = router;*/