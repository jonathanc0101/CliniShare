var dgram = require('dgram');
var listener = dgram.createSocket("udp4");

listener.bind(10000,"255.255.255.255",function(){
    listener.setBroadcast(true);
    console.log("listening");
});


listener.on("message",function(message,rinfo){
    console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
});
