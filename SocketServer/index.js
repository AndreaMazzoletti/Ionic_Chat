let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    socket.on('disconnect' , function(){
        console.log(socket.nickname + ' has disconnected' );
        io.emit('user-changed' , {user: socket.nickname, event: 'left'});
    })

    socket.on('set-nickname' , (nickname) => {
        console.log(nickname + ' has connected' );
        socket.nickname = nickname;
        io.emit('user-changed' , {user: socket.nickname , event: 'joined'});
    })

    socket.on('add-message' , (message) => {
        console.log( socket.nickname + ': ' + message.text);
        io.emit('message' , {text: message.text , from: socket.nickname , created: new Date()})
    })
});

var port = process.env.port || 3001;

http.listen(port, function(){
    console.log('listening in http://localhost:' + port);
 });