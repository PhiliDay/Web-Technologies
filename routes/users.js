var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var tj = require('templatesjs');
const sqlite3 = require('sqlite3').verbose();

// let db = new sqlite3.Database("Database.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the SQlite database.');
// });
app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// app.post('/contact', function (req, res) {
//   var mailOpts, smtpTrans;
//   //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
//   smtpTrans = nodemailer.createTransport('SMTP', {
//       service: 'Gmail',
//       auth: {
//           user: "pd14041@my.bristol.ac.uk",
//           pass: "Chudleigh123!"
//       }
//   });
//   //Mail options
//   mailOpts = {
//       from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
//       to: 'pd14041@my.bristol.ac.uk',
//       subject: 'Chudleigh123!',
//       text: req.body.message
//   };
//   smtpTrans.sendMail(mailOpts, function (error, response) {
//       //Email not sent
//       if (error) {
//           res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
//       }
//       //Yay!! Email sent
//       else {
//           res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
//       }
//   });
// });


module.exports = app;
