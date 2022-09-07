var dgram = require('dgram');
var listener = dgram.createSocket("udp4");

const {SERVER_PORT} = require("./constants");


listener.bind(SERVER_PORT,"255.255.255.255",function(){
    console.log("listening");
});


listener.on("message",function(message,rinfo){
    console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);

    const computadora = JSON.parse(message.toString());
    imprimirIPS(computadora.IPS);
});

function imprimirIPS(IPS){
    for (const element in IPS) {
        console.log(element);
        console.log(IPS[element]);
      }
}
