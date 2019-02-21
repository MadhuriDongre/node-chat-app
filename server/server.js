const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http =require('http');

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();

//integrate socketio into the code
const server = http.createServer(app);
const io =socketIO(server);

app.use(express.static(publicPath));

//connection is build-in event 
io.on('connection',(socket)=>{
    console.log('New user connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the Chat App"));
    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined the chat room!!!"));
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    socket.on('createMessage',(message)=>{
        console.log('create new chat message',message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });
});

server.listen(port,()=>{
    console.log(`Sever running on port ${port}`);
});