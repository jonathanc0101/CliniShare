var dgram = require('dgram');
var ipsGetter = require("./getIp");

var socket = dgram.createSocket("udp4");
var listener = dgram.createSocket("udp4");

let message = JSON.stringify(ipsGetter());


listener.bind(9999,undefined,function(){
    console.log("listening");
});

socket.bind(9999, undefined, function () {
    socket.setBroadcast(true);
});

socket.send(message, 0, message.length, 9999 , "255.255.255.255", function (err, bytes) {
    socket.close();
});

listener.on("message",function(message,rinfo){
    console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
});


