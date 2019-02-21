let socket = io();
// listening on client side for connect event
socket.on('connect', function () {
    console.log('connected to server');
});
// listening on client side for  connect event
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

//listener 'newMessage' event on client side
socket.on('newMessage', function(message){
    console.log('New message',message);
});
