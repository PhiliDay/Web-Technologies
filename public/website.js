function responsiveNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function validateEventForm() {
    var x = document.forms["myForm"]["email"].value;

    if (x == "") {
        alert("email must be filled out");
        return false;
    }

    var x = document.forms["myForm"]["pwd"].value;

    if (x == "") {
        alert("Password must be filled out");
        return false;
    }

    var txt;
    if (confirm("Thank you for signing up")) {
        txt = "You pressed OK!";
    } else {
        txt = "You pressed Cancel!";
    }
    document.getElementById("demo").innerHTML = txt;
}

function validateJoinForm() {
console.log("HELP");
var x=document.forms["myForm"]["firstname"].value;
if (x==null || x=="")
 {
  alert("First Name must be filled out");
  return false;
 }

var y=document.forms["myForm"]["surname"].value;
if (y==null || y=="") {
  alert("Surname must be filled out");
  return false;
}

var z=document.forms["myForm"]["email"].value;
if (z==null || z=="") {
  alert("Email must be filled out");
  return false;
}

var v=document.forms["myForm"]["degree"].value;
if (v==null || v=="") {
  alert("Degree Title must be filled out");
  return false;
}

var w=document.forms["myForm"]["psw"].value;
if (w==null || w=="") {
  alert("Password must be filled out");
  return false;
}

var u=document.forms["myForm"]["psw-repeat"].value;
if (u==null || u=="") {
  alert("Passwords dont match");
  return false;
}

if (confirm("Thank you for signing up")) {
    txt = "You pressed OK!";
} else {
    txt = "You pressed Cancel!";
}
document.getElementById("demo").innerHTML = txt;

}


//WHAT TO DO WHEN YOU LOG IN
addEventListener('load', start);
function start(){
  console.log("HI");
//  var button = document.querySelector("#x");
//window.location.href = "https://localhost:3001/index.html";
  var url = window.location.href;
  console.log("HERE" + window.location.href);

  console.log("HERE" + url);
if(url == "https://localhost:3001/index.html"){
    fetchData();
  }

  if(url == "https://localhost:3001/events.html"){
      fetchEvents();
      fetchEvent1();
      fetchEvent2();
    }
}



//
// function fetchEmail(){
//   console.log("NWO");
//   var q = new XMLHttpRequest();
//   q.onreadystatechange = receive;
//   q.open("POST", "/contact", true);
//   q.send();
//   console.log("NWO");
// }


function fetchData(){
  console.log("NWO");
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive;
  q.open("GET", "/data", true);
  q.send();
  console.log("NWO");
}


/*Getting the details needed to fill in the events dynamically*/
function fetchEvents(){
  console.log("NWO");
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive2;
  q.open("GET", "/events", true);
  q.send();
  console.log("NWO");
}

function receive(){
  console.log("asdf");
  if(this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);
  console.log("jlk", list);
  var names = list["FirstName"];
    console.log("Asdf", names);
    var html = "<ul>" + names;
    var ul = document.querySelector("#nameList");
    ul.innerHTML = html;
}

function receive2(){
  console.log("asdf");
  if(this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);
  console.log("jlk", list);

  var html = "<ul>Event Name: " + list.Name;
  html += "<ul>Date: " + list.Date;
  html += "<ul>Time: " + list.Time;
  html += "<ul>Location: " + list.Location;
  html += "<ul>Description: " + list.Description;

  var ul = document.querySelector("#eventList");
  ul.innerHTML = html;

}

function fetchEvent1(){
  console.log("NWO");
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive1;
  q.open("GET", "/events1", true);
  q.send();
  console.log("NWO");
}

function receive1(){
  console.log("asdf");
  if(this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);
  console.log("asdf", list);
  var html = "<ul>Event Name: " + list.Name;
  html += "<ul>Date: " + list.Date;
  html += "<ul>Time: " + list.Time;
  html += "<ul>Location: " + list.Location;
  html += "<ul>Description: " + list.Description;
  var ul = document.querySelector("#eventList1");
  ul.innerHTML = html;
}

function fetchEvent2(){
  console.log("NWO");
  var q = new XMLHttpRequest();
  q.onreadystatechange = receive3;
  q.open("GET", "/events2", true);
  q.send();
  console.log("NWO");
}

function receive3(){
  console.log("asdf");
  if(this.readyState != XMLHttpRequest.DONE) return;
  var list = JSON.parse(this.responseText);
  console.log("asdf", list);

  var html = "<ul>Event Name: " + list.Name;
  html += "<ul>Date: " + list.Date;
  html += "<ul>Time: " + list.Time;
  html += "<ul>Location: " + list.Location;
  html += "<ul>Description: " + list.Description;

  var ul = document.querySelector("#eventList2");
  ul.innerHTML = html;
//}
}
