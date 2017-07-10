var express = require("express");
var path = require("path");
// var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({secret: 'codingdojorocks'}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render("index");
})

app.clicks = 0;
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);


// io.sockets.on('connection', function(socket) {
io.on('connection', (socket) => {
  console.log("WE ARE USING SPROCKETS!");
  console.log(socket.id);

  socket.on( "epic_button", function(result){
    app.clicks++;
    console.log("epic button pressed: " + app.clicks)
    io.emit('count', {clicks: app.clicks});
  });

  socket.on( "reset_button", function(result){
    app.clicks = 0;
    io.emit('count', {clicks: app.clicks});
  });

})
