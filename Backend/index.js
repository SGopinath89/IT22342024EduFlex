const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let intialPath = path.join(__dirname, "../public");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(intialPath));

app.listen(5500, (req,res) =>{
    console.log('Server is running on port 5500');
})


mongoose.connect('mongodb://127.0.0.1:27017/EduFlex')
  .then(() => console.log('Connected!'))
  .catch((error) => console.log('Connection failed: ', error));

app.get('/',(req,res) => {
    return res.redirect("home.html");
})