import os from "os";
import dgram from 'dgram';
import ipsGetter from "./getIp.js";
import { SERVER_PORT, MAGIC_STRING } from "./constants.js"

const computadora = { "nombre": os.userInfo().username, 
"IPS": ipsGetter() ,
MAGIC_WORD: MAGIC_STRING,
};


function sendMessage(myMessage) {
    var sender = dgram.createSocket("udp4");

    sender.bind(undefined, undefined, function () {
        sender.setBroadcast(true);
    });

    sender.send(myMessage, 0, myMessage.length, SERVER_PORT, "255.255.255.255", function (err, bytes) {

        sender.close();
    });
}


export function sendComputerData() {
    // broadcasts the computer data to the network
    sendMessage(JSON.stringify(computadora));
}

sendComputerData();


