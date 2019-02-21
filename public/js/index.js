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
    let li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e){
    e.preventDefault(); //override the default behaviour
    socket.emit('createMessage',{
        from:'user',
        text: $('[name=message]').val()
    }, function (data) {
        console.log('Got it', data);
    })
});