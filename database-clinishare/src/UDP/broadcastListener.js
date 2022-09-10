import dgram from 'dgram';
import emitter from '../eventos/eventEmitter.js';

import {SERVER_PORT, MAGIC_STRING} from "./constants.js";


export async function listenForBroadcasts(){

    var listener = dgram.createSocket("udp4");

    listener.bind(SERVER_PORT,"255.255.255.255",function(){
        console.log("listening");
    });
    
    
    listener.on("message",function(message,rinfo){
        console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
    
        const computadora = JSON.parse(message.toString());
        
        if(computadora){
            if(computadora.MAGIC_STRING === MAGIC_STRING){
                emitter.emit("new_computer", computadora);
            }
        }

    });
    
}

function imprimirIPS(IPS){
    for (const element in IPS) {
        console.log(element);
        console.log(IPS[element]);
      }
}
