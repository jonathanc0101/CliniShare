const os = require("os");
const dgram = require('dgram');
const ipsGetter = require("./getIp");

const computadora = { "nombre": os.userInfo().username, 
"IPS": ipsGetter() }

const { SERVER_PORT } = require("./constants");


function sendMessage(myMessage) {
    var sender = dgram.createSocket("udp4");

    sender.bind(undefined, undefined, function () {
        sender.setBroadcast(true);
    });

    sender.send(myMessage, 0, myMessage.length, SERVER_PORT, "255.255.255.255", function (err, bytes) {

        sender.close();
    });
}


function sendComputerData() {
    // broadcasts the computer data to the network
    sendMessage(JSON.stringify(computadora));
}

sendComputerData();


