"use strict";
const sqlite3 = require('sqlite3').verbose();
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
const router = express.Router();
var indexRouter = require('./index.js');
var usersRouter = require('./users.js');


let db = new sqlite3.Database("Database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');



  createSignUp();

function createSignUp(){
  db.run(`INSERT INTO Member(FirstName, Surname, Email, Degree, EndDate, Password)
          VALUES((?), (?), (?), (?), (?), (?))`, [FirstName, Surname, Email, Degree, EndDate, Password], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.rowid}`);
  });
}



});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

module.exports = router;
