var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'codingdojorocks'}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  if (!req.session.result_box_str) {
    result_box_str = "<div id=\"no_div\"></div>";
    req.session.answer = Math.floor(Math.random()*101);
  }
  else {
    result_box_str = req.session.result_box_str;
  }
  res.render("index",{result_box_str: result_box_str});
})

app.post('/submit_guess', function(req, res) {
 console.log("POST DATA", req.body);
 guess = req.body.guess;

 // below is my clugy way for stopping the thing from breaking
 // if the user tries entering another number when the game has
 // ended and the request is made for a new game.

 if (!req.session.answer) {
   res.redirect('/');
 }
 if (!guess || guess < 1 || guess > 100) {
   result_box_str = '<div id="wrong_answer_div"><h1>Your number must be between 1 and 100!</h1></div>';
   console.log(result_box_str);
   req.session.result_box_str = result_box_str;
 }
 else if (guess == req.session.answer) {
   req.session.answer = null;
   result_box_str ='<div id="right_answer_div"><h2>'+ guess +' was the number!</h2><form action="/new_game" method = "post"><input type="submit" value="New Game?"></form></div>';
   console.log(result_box_str);
   req.session.result_box_str = result_box_str;
 }
 else if (guess < req.session.answer) {
   result_box_str = '<div id="wrong_answer_div"><h1>'+ guess +'? Too Low!</h1></div>';
   req.session.result_box_str = result_box_str;
 }
 else if (guess > req.session.answer) {
   result_box_str = '<div id="wrong_answer_div"><h1>'+ guess +'? Too High!</h1></div>';
   req.session.result_box_str = result_box_str;
 }
 res.redirect('/');
})

app.post('/new_game', function(req, res) {
 console.log("POST DATA", req.body);
 req.session.result_box_str = null;
 res.redirect('/');
})

// tell the express app to listen on port 8000

app.listen(8000, function() {
 console.log("listening on port 8000");
});
