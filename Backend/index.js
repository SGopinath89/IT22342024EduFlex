const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const multer = require('multer');
const Student = require('./models/regstudent.model');
const Teacher = require('./models/regteacher.model');
const Course = require('./models/course.model');
const Lesson = require('./models/lesson.model');
//const Contact = require('./models/contact.modekl');
//const contactRoute = require('./routes/contact.routes');

/*const regstudentRoute = require('./routes/regstudentRoute');*/

const app = express();

//app.use('/contacts',contactRoute);

const upload = multer({ dest: 'uploads/' }); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let intialPath = path.join(__dirname, "../public");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(intialPath));

/*app.use('/regstudents',regstudentRoute);*/


app.listen(3000, (req,res) =>{
    console.log('Server is running on port 3000');
})


mongoose.connect('mongodb://127.0.0.1:27017/EduFlex')
  .then(() => console.log('Connected!'))
  .catch((error) => console.log('Connection failed: ', error));

app.get('/',(req,res) => {
    return res.redirect("home.html");
})

app.get('/regstudents',(req,res) => {
    res.sendFile(path.join(intialPath,"reg_student.html"));
})

app.post('/regstudents', async (req, res) => {
    const { name, uname, password, cpassword, email, age, college, role } = req.body;

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
        const existingUser = await Student.findOne({ uname });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

        /* const salt = await bcrypt.genSalt(10); */
        /* const hashedPassword = await bcrypt.hash(password, 10); 
        console.log('Hashed Password:', hashedPassword); // Log the hashed password */
        const student = new Student({ name, uname, password/* : hashedPassword */ , email, age, college, role });
        await student.save();
        res.status(200).json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


/* *******REGISTER studentS******* */
app.get('/regstudents',(req,res) => {
    res.sendFile(path.join(intialPath,"reg_student.html"));
})

app.post('/regstudents', async (req, res) => {
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
        const existingUser = await student.findOne({ uname });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username already exists.' });
        }

        /*  const hashedPassword = await bcrypt.hash(password, 10);  */
        const student = new student({ name, uname, password/*  : hashedPassword */ , email, age, qualification });
        await student.save();
        res.status(200).json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

/* ********LOGIN PAGE ******** */

app.post('/login', async (req, res) => {
    const { uname, password } = req.body;


    try {
    console.log('Received login attempt for username:', uname);
        // Validate user input (optional)
        if (!uname || !password) {
            return res.status(400).json({ success: false, message: 'Please enter both username and password.' });
        }
        // Check in students collection
        let user = await Student.findOne({ uname });
        let userType = 'student'; // to differentiate between student and teacher
        if (!user) {
            // If user is not found in students collection, check in teachers collection
            user = await Teacher.findOne({ uname });
            userType = 'teacher';
        }

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        console.log('User found:', user);

       /*  if (!user.password) {
            return res.status(500).json({ success: false, message: 'Password hash is missing.' });
        }
 */
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password entered:', password);
console.log('Password in database:', user.password);
console.log('Password match status:', isMatch); // Log the result of the password comparison
        
        if (isMatch) {
            // Redirect based on user type
            console.log(`Redirecting to ${userType} dashboard`);
            const userDetails = {
                uname: user.uname,
                name: user.name,
                email: user.email,
                qualification: userType === 'teacher' ? user.qualification : undefined
            };
            console.log(userDetails);
            

            if (userType === 'student') {
                console.log('Redirect URL:', '/studentdashboard.html');
                return res.status(200).json({ success: true, user: userDetails, redirectPage: '/studentdashboard.html' });
            } else {
                return res.status(200).json({ success: true, user: userDetails, redirectPage: '/teacherdashboard.html' });
            }
        } else {
            console.warn('Invalid password attempt for user:', uname);
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }
        }catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ success: false, message: error.message });
        }
        
});
/******create live session******** */

/* *********teaherdashboard************** */

/* **********course********** */

app.post('/addcourse', upload.single('course-image'),  async (req, res) => {
    const { title, description, email } = req.body;

    if (!title || !description || !email) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: title, description, email'
        });
    }

    try {
        // Log before finding teacher
          console.log('Finding teacher with email:', email);


        // Find teacher by email
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            console.log('Teacher not found for email:', email);
            return res.status(404).json({
                success: false,
                message: 'Teacher not found'
            });
        }

          // Log before creating course
          console.log('Creating course for teacher:', teacher._id);

        // Use teacher's ID
        const course = new Course({
            title,
            description,
            teacherId: teacher._id
        });

        await course.save();

        console.log('Course saved:', course);

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

/* app.get('/courses', async (req, res) => {
    const teacherEmail = req.query.email; // Get teacher's email from query params
    try {
        const courses = await Course.find({ teacherEmail }); // Filter courses by teacher's email
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
 */



app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get course by ID
app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid course ID format.' });
    }

    try {
        console.log('Fetching course with ID:', id);

        const course = await Course.findById(id);
        console.log('Retrieved course:', course);

        if (!course) {
            console.log('Course not found.');
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        console.log('Sending course data:', course);
        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});



app.get('/teachers/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found.' });
        }
        res.json({ success: true, teacher });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});


/****** LESSONS ******/

// Add lesson to course
app.post('/courses/:id/lessons', async (req, res) => {
    const { id } = req.params;
    const { title, notes, video, quiz } = req.body;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid course ID format.' });
    }

    

    try {
        // Find the course by ID
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

         // Create a new lesson
         const newLesson = new Lesson({ title, notes, video, quiz, courseId: id });

         // Save the lesson
         await newLesson.save();
 
         // Update the course's lessons array
         course.lessons.push(newLesson._id);
         await course.save();

        // Assuming course has a lessons array
        //course.lessons.push({ title, notes, video, quiz });

        // Save the updated course
       // await course.save();

        res.status(201).json({ success: true, message: 'Lesson added successfully.', course });
    } catch (error) {
        console.error('Error adding lesson:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


/* *******VALIDATION FUNCTIONS******* */


function validateUsername(username) {
    const re = /^[a-zA-Z0-9]{3,}$/;
    return re.test(username);
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}


/* **********course********** */

app.post('/addcourse', async (req, res) => {
    const { title, description, email } = req.body;

    if (!title || !description || !email) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields: title, description, email'
        });
    }

    try {
        // Log before finding student
          console.log('Finding student with email:', email);


        // Find student by email
        const student = await student.findOne({ email });

        if (!student) {
            console.log('student not found for email:', email);
            return res.status(404).json({
                success: false,
                message: 'student not found'
            });
        }

          // Log before creating course
          console.log('Creating course for student:', student._id);

        // Use student's ID
        const course = new Course({
            title,
            description,
            studentId: student._id
        });

        await course.save();

        console.log('Course saved:', course);

        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get course by ID
app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid course ID format.' });
    }

    try {
        console.log('Fetching course with ID:', id).populate('lessons');

        const course = await Course.findById(id);
        console.log('Retrieved course:', course);

        if (!course) {
            console.log('Course not found.');
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

        console.log('Sending course data:', course);
        res.status(200).json({ success: true, course });
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

app.get('/students/:id', async (req, res) => {
    try {
        const student = await student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'student not found.' });
        }
        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/check-login', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});


/****** LESSONS ******/

// Add lesson to course
app.post('/courses/:id/lessons', async (req, res) => {
    const { id } = req.params;
    const { title, notes, video, quiz } = req.body;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid course ID format.' });
    }

    

    try {
        // Find the course by ID
        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }

         // Create a new lesson
         const newLesson = new Lesson({ title, notes, video, quiz, courseId: id });

         // Save the lesson
         await newLesson.save();
 
         // Update the course's lessons array
         course.lessons.push(newLesson._id);
         await course.save();

        // Assuming course has a lessons array
        //course.lessons.push({ title, notes, video, quiz });

        // Save the updated course
       // await course.save();

        res.status(201).json({ success: true, message: 'Lesson added successfully.', course });
    } catch (error) {
        console.error('Error adding lesson:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;

    // Validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid course ID format.' });
    }

    try {
        const course = await Course.findById(id).populate('studentId', 'name');
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found.' });
        }
        res.status(200).json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});

// Get courses for a specific student by email
app.get('/student/courses/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Find student by email
        const student = await student.findOne({ email });

        if (!student) {
            return res.status(404).json({ success: false, message: 'student not found.' });
        }

        // Find courses associated with this student's ID
        const courses = await Course.find({ studentId: student._id });

        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses for student:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});


//get student by ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }
        res.json({ success: true, student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// GET courses for a specific teacher
app.get('/teacher/courses/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Find teacher by email
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            return res.status(404).json({ success: false, message: 'Teacher not found.' });
        }

        // Find courses associated with this teacher's ID
        const courses = await Course.find({ teacherId: teacher._id });

        res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error('Error fetching courses for teacher:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
});
