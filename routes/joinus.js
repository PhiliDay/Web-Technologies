var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

app.set('view engine', 'pug');
app.set('views', './views');
//var fetchRouter = require('./fetch.js');

const users = [];

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.post('/join', function(req, res){
   console.log(req.body);
   const user = req.body;

   var fetchRouter = require('./fetch.js');

     FirstName = user.firstname;
     Surname = user.surname;
     Email = user.email;
     Degree = user.degree;
     EndDate = user.Year;
     Password = user.psw;

   console.log(FirstName);
   console.log("HELLO!");
  //
  // app.use(fetchRouter);
  // app.use('/', fetchRouter);
  //if email is unique, refresh else say incorrect
  res.redirect('https://localhost:3000/joinus.html');
   res.send("recieved your request!");
});



//    formData(user.firstname, user.surname, Email, Degree, EndDate, Password);




// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });



module.exports = app;
