const express = require('express');
const app = express();
const route = require('./app/routes.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8080 || process.env.PORT;

route(app); // loading routes
app.set('view engine','ejs');
app.use(express.static('public'));

io.on('connection',function(socket){
    console.log('User connected!');

    socket.on('set-x',function(val){
        io.emit('set-x',val);
        console.log('index-x:'+val);
    });

    socket.on('set-0',function(val){
        io.emit('set-0',val);
        console.log('index-0:'+val);
    });

});

http.listen(port);
console.log('Server is running on port:' + port);