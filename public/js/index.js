let socket = io();
// listening on client side for connect event
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: "madhu@gmail.com",
    //     subject: "Hiii",
    //     text: "How r u?",
    //     createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    // });

    // socket.emit('createMessage',{
    //     from: "madhu",
    //     text: "How r u?"
    // });

});
// listening on client side for  connect event
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

//listener 'newEmail event on clientside
socket.on('newEmail', function(email){
    console.log('new email(s) in your inbox', email);
});

socket.on('newMessage', function(message){
    console.log('New message',message);
});
