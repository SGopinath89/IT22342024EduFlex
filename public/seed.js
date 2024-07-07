const mongoose = require('mongoose');
const Course = require('./models/course.model');

mongoose.connect('mongodb://localhost:27017/eLearningPlatform', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const exampleCourse = new Course({
    title: 'Example Course',
    description: 'This is an example course.',
    materials: [
        {
            notesUrl: 'http://example.com/lesson1-notes',
            videoUrl: 'http://example.com/lesson1-video',
            quizUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdvxxF_Ldsij5Lqo47uISY4m3Et0T_Rif9ch7kBVS2les33Hg/viewform?usp=sf_link'
        }
    ]
});

exampleCourse.save()
    .then(() => {
        console.log('Course saved');
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
