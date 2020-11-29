const express = require('express');
const flash = require('connect-flash');
const app = express();
require('dotenv').config();

const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// Item Schema
const Item = require('./models/item');

//from env file
const dataBaseLink = process.env.DBLink; // change it to your DB link
const port = process.env.PORT; // change it to any port number

// connect DB
mongoose.connect(dataBaseLink, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { console.log('DB connected.........') })
  .catch(err => console.log('DB not connected :' + err))

//hbs register helper
hbs.registerHelper('check', function (data) {
  let x=data.length ;// how many items i have?
  data.map(item =>{
    if (item.done){// items i bought (done)?
      x--;
    }
  })
  return x; // Items need to buy (item left)
})

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//setup a template engines
app.set('view engine', 'hbs');

//setup connect flash
app.use(session({
  secret: 'anySECRET'
}));
app.use(flash());

//Routes

// Run Home page 
app.get('/', (req, res) => {
  Item.find((err, data)=> {
    if (err) throw err
    res.render('index', {item: data, msg: req.flash('MSG')});
  })
})

// add new item
app.post('/item/add', (req, res) => {
  let newItem = new Item(req.body);
  newItem.save((err, data) => {
    if (err) throw err
    console.log('New item is saved in DB......')
    req.flash('MSG', data.name,'  has been added successfully')
    res.redirect('/');
  });
})

// change item to Importent or not Importent
app.get('/item/imp/:id/:value', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {priority: req.params.value}, (err, data)=> {
    if (err) throw err
    // console.log(data)
    console.log('One item changed Importent or not Importent......')
    res.redirect('/');
  });
})

// change item to done 
app.get('/item/done/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, {done: true}, (err, data)=> {
    if (err) throw err
    // console.log(data)
    console.log('One item is done......')
    req.flash('MSG', data.name,' has been done')
    res.redirect('/');  });
})

// delete one item
app.get('/item/del/:id', (req, res) => {
  Item.findByIdAndDelete(req.params.id, (err, data)=> {
    if (err) throw err
    // console.log(data)
    console.log('One item is deleted from DB......')
    req.flash('MSG', data.name,' has been successfully deleted')
    res.redirect('/');
  });
})

// find item to Update using ajax
app.post('/item/findToUpdate/:id', (req, res) => {
  Item.findById(req.params.id, (err, data)=> {
    if (err) throw err
    // console.log(data)
    res.json(data);  
  });
})

// update item to  
app.post('/item/update/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, (err, data)=> {
    if (err) throw err
    // console.log(data)
    console.log('One item is updated in DB......')
    req.flash('MSG', data.name,' has been successfully updated to ',req.body.name)
    res.redirect('/');  });
})

//listen
app.listen(port, () => {
  console.log(`********************* Server is Running at http://localhost:${port} *********************`);
})