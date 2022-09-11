import dgram from 'dgram';

import emitter from '../eventos/eventEmitter.js';

import os from "os";

import {SERVER_PORT, MAGIC_STRING} from "./constants.js";

import { computadora } from './broadcastSender.js';

export async function listenForBroadcasts(){

    var listener = dgram.createSocket("udp4");

    listener.bind(SERVER_PORT,"255.255.255.255",function(){
        console.log("listening");
    });
    
    
    listener.on("message",function(message,rinfo){
        
        const computadoraNueva =JSON.parse(message);
        
        //si es la misma ip no hacemos nada (estamos enviando nosotros el mensaje)
        if(JSON.stringify(computadora) === JSON.stringify(computadoraNueva)) {
            return;
        }

        computadoraNueva.MAGIC_STRING = computadora.MAGIC_STRING.trim();
        
        if(computadoraNueva){            
            
            if(computadoraNueva.MAGIC_STRING === MAGIC_STRING){
                console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
                emitter.emit("new_computer", computadoraNueva);
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
