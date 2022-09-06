var dgram = require('dgram');

var socket = dgram.createSocket("udp4");

let message = "HOLA MUNDO ESTOY HACIENDO UN BROADCAST"

socket.bind(9999, undefined, function () {
    socket.setBroadcast(true);
});

socket.send(message, 0, message.length, 9999    , "255.255.255.255", function (err, bytes) {
    socket.close();
});
