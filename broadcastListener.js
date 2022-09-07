var dgram = require('dgram');

const { SERVER_PORT, MAGIC_WORD} = require("./constants");

function listenForBroadcasts() {
    var listener = dgram.createSocket("udp4");

    listener.bind(SERVER_PORT, "255.255.255.255", function () {
        console.log("listening");
    });


    listener.on("message", function (message, rinfo) {
        console.log('Message from: ' + rinfo.address + ':' + rinfo.port);

        const computadora = JSON.parse(message.toString());

        if(computadora["MAGIC_WORD"] == MAGIC_WORD){
            // aca se levanta el evento de nueva computadora asociada
            console.log("llegaron datos de una computadora: " + JSON.stringify(computadora));
        }
    });
}

function imprimirIPS(IPS) {
    for (const element in IPS) {
        console.log("interface: " + element);
        console.log("IP: " + IPS[element]);
    }
}


module.exports.listenForBroadcasts = listenForBroadcasts;
module.exports.imprimirIPS= imprimirIPS;

listenForBroadcasts();