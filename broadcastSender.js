const os = require("os");
const dgram = require('dgram');

const getIPS = require("./getIp");
const { SERVER_PORT, MAGIC_WORD} = require("./constants");
const computadora = {
    "nombre": os.userInfo().username,
    "IPS": getIPS(),
    "MAGIC_WORD":MAGIC_WORD,
}


function broadcastMessage(myMessage) {
    var sender = dgram.createSocket("udp4");

    sender.bind(undefined, undefined, function () {
        sender.setBroadcast(true);
    });

    sender.send(myMessage, 0, myMessage.length, SERVER_PORT, "255.255.255.255", function (err, bytes) {

        sender.close();
    });
}


function broadcastComputerIPS() {
    // broadcasts the computer data to the network
    broadcastMessage(JSON.stringify(computadora));
}




function broadcastRepeating() {
    broadcastComputerIPS();
    setTimeout(broadcastRepeating,2000);
}

broadcastRepeating();


module.exports.broadcastComputerIPS = broadcastComputerIPS;
module.exports.broadcastComputerIPSRepeating = broadcastRepeating;