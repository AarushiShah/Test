//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'))

let toDoList = ["eat", "sleep", "repeat"];
let workList = [];

app.get("/",function(req, res){
  let date = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let finalDate = date.toLocaleString("en-US", options);
  res.render('index', {list:toDoList, title: finalDate});
});

app.get("/work",function(req, res){
  res.render('index', {list:workList, title: "Work"});
});

app.post('/', function (req, res) {
  if(req.body.typeList === "Work") {
    workList.push(req.body.addItem);
    res.redirect("/work");
  } else {
    toDoList.push(req.body.addItem);
    res.redirect("/");
  }

});

app.listen(3000, function(){
  console.log("Server is running");
});
