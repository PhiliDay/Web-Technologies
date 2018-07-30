var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var https = require('https');
var forceSsl = require('express-force-ssl');
var hostname = 'localhost';
var sqlite3 = require('sqlite3').verbose();
var tj = require('templatesjs');
var nodemailer = require("nodemailer");
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var banned = [];
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var router = express.Router();

var port = 3000

var banned = [];

let db = new sqlite3.Database("Database.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');

function checkSite() {
    var path = "./public";
    var ok = fs.existsSync(path);
    if (ok) path = "./public/index.html";
    if (ok) ok = fs.existsSync(path);
    if (! ok) console.log("Can't find", path);
    return ok;
}

app.get("/", function(req, res){
  app.use(express.static(path.join(__dirname, 'public')));

});

app.get("/data", function(req, res){
    getList(res);
});

app.get("/events", function(req, res){
    getEvent(res);
});

app.get("/events1", function(req, res){
    getEvent1(res);
});

app.get("/events2", function(req, res){
    getEvent2(res);
});


 function getEvent(response){
   var ps = db.prepare("SELECT * From Events Where Eventid = 1");
   ps.get(ready);
   console.log("1");

   function ready(err, list){
     if(err){
     }
     deliverList(list, response);
     console.log("2");

   }
 }

 function getEvent1(response){
   var ps = db.prepare("SELECT * From Events Where Eventid = 2");
   ps.get(ready);
   console.log("1");

   function ready(err, list){
     if(err){
     }
     deliverList(list, response);
     console.log("2");

   }
 }

 function getEvent2(response){
   var ps = db.prepare("SELECT * From Events Where Eventid = 3");
   ps.get(ready);
   console.log("1");

   function ready(err, list){
     if(err){
     }
     deliverList(list, response);
     console.log("2");

   }
 }


function getList(response){
  var ps = db.prepare("SELECT FirstName From Member Where Userid = 1");
  ps.get(ready);
  console.log("1");

  function ready(err, list){
    if(err){
    }
    deliverList(list, response);
    console.log("2");

  }
}

function deliverList(list, response){
  var text = JSON.stringify(list);
     console.log("2");
     console.log("text" + text);
     deliver(response, "text/plain", null, text);
}

function deliver(response, type, err, content) {
    if (err) return fail(response, NotFound, "File not found");
    var typeHeader = { "Content-Type": type };
    response.writeHead(OK, typeHeader);
    response.write(content);
    response.end();
}

/*Create the https server*/
var httpsOptions = {
    key: fs.readFileSync('./encryption/cert.key'),
    cert: fs.readFileSync('./encryption/cert.pem')
}
var server = https.createServer(httpsOptions, app)
    .listen(3001, () => {
        console.log('server running at ' + 3001)
    })

/* view engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* Static delivery of content in 'public' folder */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  console.log("NOTHERE");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log("WHY");
});

});

// Give a minimal failure response to the browser
function fail(response, code, text) {
    var textTypeHeader = { "Content-Type": "text/plain" };
    response.writeHead(code, textTypeHeader);
    response.write(text, "utf8");
    response.end();
}
// Forbid any resources which shouldn't be delivered to the browser.
function isBanned(url) {
    for (var i=0; i<banned.length; i++) {
        var b = banned[i];
        if (url.startsWith(b)) return true;
    }
    return false;
}

// Find the content type to respond with, or undefined.
function findType(url) {
    var dot = url.lastIndexOf(".");
    var extension = url.substring(dot + 1);
    return types[extension];
}

function banUpperCase(root, folder) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(root + folder);
    for (var i=0; i<names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) {
            if (verbose) console.log("Banned:", file);
            banned.push(file.toLowerCase());
        }
        var mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(root, file);
    }
}

function defineTypes() {
    var types = {
        html : "application/xhtml+xml",
        css  : "text/css",
        js   : "application/javascript",
        mjs  : "application/javascript", // for ES6 modules
        png  : "image/png",
        gif  : "image/gif",    // for images copied unchanged
        jpeg : "image/jpeg",   // for images copied unchanged
        jpg  : "image/jpeg",   // for images copied unchanged
        svg  : "image/svg+xml",
        json : "application/json",
        pdf  : "application/pdf",
        txt  : "text/plain",
        ttf  : "application/x-font-ttf",
        woff : "application/font-woff",
        aac  : "audio/aac",
        mp3  : "audio/mpeg",
        mp4  : "video/mp4",
        webm : "video/webm",
        ico  : "image/x-icon", // just for favicon.ico
        xhtml: undefined,      // non-standard, use .html
        htm  : undefined,      // non-standard, use .html
        rar  : undefined,      // non-standard, platform dependent, use .zip
        doc  : undefined,      // non-standard, platform dependent, use .pdf
        docx : undefined,      // non-standard, platform dependent, use .pdf
    }
    return types;
}
module.exports = app;
