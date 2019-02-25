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
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#messageTemplate').html();
    let html = Mustache.render(template,{
        text:message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#locationMessageTemplate').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
});

$('#message-form').on('submit', function(e){
    e.preventDefault(); //override the default behaviour
    let messageTextBox = $('[name=message]');
    socket.emit('createMessage',{
        from:'user',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    })
});

let locationbutton = $('#sendLocation');
locationbutton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    locationbutton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationbutton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage',{
            latitute: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        locationbutton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch Location');
    });
});