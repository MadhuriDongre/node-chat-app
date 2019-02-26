const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http =require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();

//integrate socketio into the code
const server = http.createServer(app);
const io =socketIO(server);
let users = new Users();
app.use(express.static(publicPath));

//connection is build-in event 
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and RoomName are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));

        socket.emit('newMessage', generateMessage("Admin", `Welcome to the ${params.room} , ${params.name} `));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));
        callback();
    });

    socket.on('disconnect',()=>{
        console.log(socket.id);
        let user = users.removeUser(socket.id);
        console.log(user, '\n', users.getUserList(user.room));
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage("Admin", `${user.name} has left`));
        }
        console.log('User disconnected');
    });

    socket.on('createMessage',(message,callback)=>{
        console.log('create new chat message',message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server');
    });
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitute,coords.longitude));
    });
});

server.listen(port,()=>{
    console.log(`Sever running on port ${port}`);
});