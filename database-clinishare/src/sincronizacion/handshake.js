import axios from "axios";
import { SERVER_BD_PORT, INITIAL_RESPONSE } from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export function handleNewComputer(computadora) {

    for (let ip in computadora.IPS) {
        const getMethodString = 'http://' + computadora.IPS[ip].toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/clinishare';

        axios
            .get(getMethodString)
            .then(res => {
                if(res.data.INITIAL_RESPONSE === INITIAL_RESPONSE ){
                    // hacemosAlgo
                    emitter.emit("new_valid_computer", {nombre:computadora.nombre, ip:computadora.IPS[ip]})
                    return;
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


}

export function handleNewComputerNonLooping(computadora) {

    for (let ip in computadora.IPS) {
        const getMethodString = 'http://' + computadora.IPS[ip].toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/clinishare';

        axios
            .get(getMethodString)
            .then(res => {
                if(res.data.INITIAL_RESPONSE === INITIAL_RESPONSE ){
                    // hacemosAlgo
                    emitter.emit("new_valid_computer_non_looping", {nombre:computadora.nombre, ip:computadora.IPS[ip]})
                    return;
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


}

export function getInitialResponse(req, res) {
    return({ "INITIAL_RESPONSE": INITIAL_RESPONSE });
}


