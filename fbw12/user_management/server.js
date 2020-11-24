const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user')
const Class = require('./models/class')
const port = 5000;
let thisUser = '';
let adelLink = 'mongodb+srv://admin:adeladmin@adeldci.mmdjq.mongodb.net/testDB';
let KhaledLink = 'mongodb+srv://admin:adeladmin@adeldci.mmdjq.mongodb.net/testDB';
let colection= "PPJ";
let mlink= "mongodb+srv://Admin:123@cluster0.dwwx2.mongodb.net/" + colection;
// connect DB
mongoose.connect(mlink,{useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> {console.log('DB connected.........')})
.catch(err => console.log('DB not connected :'+err))

//hbs function
hbs.registerHelper('loud', function (aString) {
  return aString.toUpperCase()
})

hbs.registerHelper('addOne', function (aString) {
  return aString+1;
})

hbs.registerHelper('nameOf', function (aString) {
  console.log(aString);
  let myUser
  User.find({_id: aString},(err,data)=>{
    if (err) {console.log(err)}
    console.log(data);
    myUser= data[0].firstName+' '+data[0].lastName;
    console.log(myUser);
  })
  console.log('2nd:'+myUser);
  return myUser;
})

// setup body-parser
app.use(bodyParser.urlencoded({extended: true}));

//setup a static Folder
app.use(express.static(path.join(__dirname, 'public')));

//setup a template engines
app.set('view engine', 'hbs');

//Routes
app.get('/',(req,res)=>{
  res.render('index',{pageTitle: 'Home Page'});
}) 

app.get('/about-us',(req,res)=>{
  res.render('about',{pageTitle: 'About us'});
}) 

app.get('/our-courses',(req,res)=>{
  res.render('courses', {pageTitle: 'Courses Page'});
}) 

app.get('/contact-us',(req,res)=>{
  res.render('contact', {pageTitle: 'Contact Us'});
}) 

app.get('/log-in',(req,res)=>{
  res.render('login', {
    pageTitle: 'Log in page',
    notMatch: 'd-none'
  });
})

app.get('/sign-up',(req,res)=>{
  res.render('signup', {pageTitle: 'Sign up page'});
}) 

app.get('/user-page',checkLogIN,(req,res)=>{
  console.log(thisUser)
  res.render('user', {
    pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
    myUser: thisUser,
    adminsButton: 'd-none',
  })
}) 

app.get('/classes-page',(req,res)=>{
  Class.find((err,data)=>{
    if (err) {console.log(err)}
    res.render('classes',{pageTitle: 'Classes', clsses: data});
  })
})

let classID ='';
app.get('/class-page/:id', (req, res)=> {
  classID = req.params.id;
  res.redirect('/class-info')
});

app.get('/class-info', (req, res)=> {
  Class.find({_id: classID}, (err, data)=>{
      if(err) throw err;
      console.log(data);
      res.render('classInfo', {
        pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
        class: data[0]
      })
  });
});

//POST 
app.post('/log-in',checkuser,(req,res)=>{
  res.render('login', {
    pageTitle: 'Log in page',
    plzLogin: 'd-none'
  }); 
})

app.post('/sign-up',(req,res)=>{
  console.log(req.body);
  let newUser = new User(req.body)
  newUser.save(()=> { 
    console.log('Data is saved......')
  });
  res.redirect('/log-in');  
})

app.post('/log-out',(req,res)=>{
  thisUser = '';
  res.redirect('/');  
})

app.post('/classes-page',(req,res)=>{
  res.redirect('/classes-page')
})

app.post('/add-class',(req,res)=>{
  console.log(req.body);
  let newClass = new Class(req.body)
  newClass.save(()=> { 
    console.log('Data is saved......')
  });
  res.redirect('/classes-page');  
})

app.post('/del-class',(req,res)=>{
  console.log(req.body);
  Class.deleteOne(req.body,(err,result)=>{
    console.log(result);
    res.redirect('/classes-page');  
  })
})

app.post('/teachers-list',(req,res)=>{
  User.find({userGroup: 'Teacher'},(err,data)=>{
    if (err) {console.log(err)}
    //console.log(data);
    res.render('teachersList', {
      pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
      teachers: data
    })
  })
})

app.post('/students-list',(req,res)=>{
  User.find({userGroup: 'Student'},(err,data)=>{
    if (err) {console.log(err)}
    //console.log(data);
    res.render('studentsList', {
      pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
      students: data
    })
  })
})

app.post('/student-list-find',(req,res)=>{
  let msg = 'Student not found or this is not a student'
  let string = capitalizeFirstLetter(req.body.firstName); //ADEL  //adel  // aDEl
  console.log(string)
  User.find({userGroup: 'Student', firstName: string},(err,data)=>{
    if (err) {console.log(err)}
    console.log(data, data.length);
    if (data.length == 0){
      res.render('studentsList', {
        pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
        students: data,
        msg: msg
      })
    }
    else {
      res.render('studentsList', {
        pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
        students: data
      })
    }
  })
})
app.post('/teacher-list-find',(req,res)=>{
  let msg = 'teacher not found or this is not a teacher'
  let string = capitalizeFirstLetter(req.body.firstName); //ADEL  //adel  // aDEl
  console.log(string)
  User.find({userGroup: 'Teacher', firstName: string},(err,data)=>{
    if (err) {console.log(err)}
    console.log(data, data.length);
    if (data.length == 0){
      res.render('teachersList', {
        pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
        teachers: data,
        msg: msg
      })
    }
    else {
      res.render('teachersList', {
        pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
        teachers: data
      })
    }
  })
})

app.post('/save-changes',(req,res)=>{
  User.updateOne({_id: req.body._id},req.body,(err,data)=>{
    if (err) {console.log(err)}
    console.log(data);
    User.find({_id: req.body._id},(err,data)=>{
      if (err) {console.log(err)}
      thisUser = data[0];
      res.redirect('/user-page');
    })
  })
})

//listen
app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`);
  })

  //functions

  function checkuser(req, res, next) {
    console.log(req.body);
    let userFound = false;
    User.find((err,data)=>{
      if (err) {console.log(err)}
      data.map((item)=>{
        if (item.email == req.body.email && item.password == req.body.password){
          userFound = true;
          console.log(item);
          thisUser = item;
        }
      })
      if (userFound){
        res.redirect('/user-page');
      }
      else {
        next();
      } 
    })
  }

  function checkLogIN(req, res, next) {
      if (thisUser !== ''){
        if (thisUser.userGroup == "Admin") {
          console.log('this is an admin')
          res.render('user', {
            pageTitle: thisUser.userGroup+' page - '+thisUser.firstName+' '+thisUser.lastName,
            myUser: thisUser,
          })

        } else {
          next()
        }
      }
      else {
        res.redirect('/log-in');  
      }
  }

 function capitalizeFirstLetter(x){
   x = x.toLowerCase() //adel
  return x.charAt(0).toUpperCase() + x.slice(1);//Adel
 }