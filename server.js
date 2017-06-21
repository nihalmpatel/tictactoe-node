const express = require('express');
const app = express();
const route = require('./app/routes.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = 8080 || process.env.PORT;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
route(app); // loading routes


var roomno = 1;
var user=1;
io.on('connection',function(socket){
    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1){
        roomno++;    
    }
    socket.join("room-"+roomno);
    

    //Send this event to everyone in the room.
    io.sockets.in("room-"+roomno).emit('connectToRoom',roomno);

    socket.on('setval',function(data){
        console.log('-------------------------------------------------------')
        console.log('setval data roomno:'+ data.roomno);
        console.log('setval data val:'+ data.val);
        console.log('setval data index:'+ data.index);
        io.sockets.in("room-"+data.roomno).emit('setval',data);
    });

    console.log('User connected in room-'+roomno);
});

http.listen(port);
console.log('Server is running on port:' + port);