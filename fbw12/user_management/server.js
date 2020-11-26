const express = require('express');
const flash = require('connect-flash');
const app = express();
require('dotenv').config();

const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// connect DB
mongoose.connect(process.env.DBLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('DB connected.........') })
  .catch(err => console.log('DB not connected :' + err))

//hbs function helper
hbs.registerHelper('loud', function (aString) {
  return aString.toUpperCase()
})
hbs.registerHelper('addOne', function (aString) {
  return aString + 1;
})

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setup a static Folder
app.use(express.static(path.join(__dirname, 'public')));

//setup a session
app.use(session({ secret: process.env.SESSION_SECRET }));

//setup a template engines
app.set('view engine', 'hbs');

//setup Partials folder && files
hbs.registerPartials(__dirname + '/views/partials/')
hbs.registerPartial('header', 'header.hbs')
hbs.registerPartial('footer', 'footer.hbs')
hbs.registerPartial('tableOfUsers', 'tableOfUsers.hbs')

//setup connect flash
app.use(flash());

//Routes
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const ajaxRoutes = require('./routes/ajaxRoutes');

app.use('/', mainRoutes) // Run main Routes 
app.use('/user', userRoutes) // Run user Routes 
app.use('/ajax', ajaxRoutes) // Run ajax Routes 

//listen
app.listen(process.env.PORT, () => {
  console.log(`********************* Server is Running at http://localhost:${process.env.PORT} *********************`);
})