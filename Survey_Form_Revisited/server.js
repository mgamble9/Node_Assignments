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

// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});

var io = require('socket.io').listen(server);

// io.sockets.on('connection', function(socket) {
io.on('connection', (socket) => {
  console.log("WE ARE USING SPROCKETS!");
  console.log(socket.id);

  socket.on( "posted_form", function(result){
    console.log('Submit button is clicked with data: ' + result.name);
    let msg_out = "<p>You emmitted the following information to the server: " + JSON.stringify(result) + "</p>";
    console.log(msg_out);
    socket.emit('updated_message', {msg_out: msg_out});
    let lucky_num = Math.floor(Math.random()*1001);
    let lucky_num_out = "<p>Your lucky number emitted by the server is: " + lucky_num + "</p>";
    console.log(lucky_num_out);
    socket.emit('random_number', {lucky_num_out: lucky_num_out});
  });

})
