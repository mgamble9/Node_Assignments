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
  res.render("index");
})
app.get('/result', function(req, res) {
  result = {
    name: req.session.name,
    city: req.session.city,
    language: req.session.language,
    comment: req.session.comment
  }
  res.render("result", result);
})
app.post('/process_form', function(req, res) {
 console.log("POST DATA", req.body);
 req.session.name = req.body.full_name;
 req.session.city = req.body.city_location;
 req.session.language = req.body.fave_language;
 req.session.comment = req.body.comment;
 res.redirect('/result');
})
app.post('/button_back', function(req, res) {
 console.log("POST DATA", req.body);
 res.redirect('/');
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
