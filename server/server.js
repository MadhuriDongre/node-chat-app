const path = require('path');
const express = require("express");
const socketIO = require("socket.io");
const http =require('http');

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

    //listening to disconnect event on server side
    socket.emit('newEmail',{
        from:"madhu@gmail.com",
        text:"Hi Madhu",
        createdAt: new Date().getDate()+ '-' + new Date().getMonth() + '-' + new Date().getFullYear() 
    });
    socket.on('createEmail',(email)=>{
        console.log(email);
    });

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    // socket.emit('newMessage',{
    //     from:"madhu",
    //     text:"Hi Madhu",
    //     createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    // });

    socket.on('createMessage',(message)=>{
        console.log('create new chat message',message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
        })
    });
});

server.listen(port,()=>{
    console.log(`Sever running on port ${port}`);
});