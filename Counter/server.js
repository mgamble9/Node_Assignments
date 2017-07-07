// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// session use call
app.use(session({secret: 'codingdojorocks'}));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
  count = req.param.count
  if (typeof(req.session.count) == "undefined") {
    req.session.count = 1;
  }
  else {
    req.session.count += 1;
  }
  console.log(req.session.count);
  res.render("index",{count: req.session.count});
})
app.post('/button_plus2', function(req, res) {
 console.log("POST DATA", req.body);
 req.session.count += 1;
 res.redirect('/');
})
app.post('/button_reset', function(req, res) {
 console.log("POST DATA", req.body);
 req.session.count = 0;
 res.redirect('/');
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
