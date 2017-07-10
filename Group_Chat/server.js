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
var chats = [];
io.sockets.on('connection', function(socket){
    console.log('We are using sockets!');
    console.log(socket.id);

    socket.on('new_user', function(data){
        console.log("new user");
        console.log(data.name);
        socket.emit('server_response', {chats: chats});
    });

    socket. on('new_message', function(data){
        console.log(data.name);
        console.log(data.chat);
        chats.push({name:data.name, message:data.chat})
        io.emit('chat_update', {chats: chats});
    });
})
