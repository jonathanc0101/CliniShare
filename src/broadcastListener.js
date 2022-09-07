const dgram = require('dgram');
const { observer } = require("./observer");

const { SERVER_PORT, MAGIC_WORD } = require("./constants");

function listenForBroadcasts() {
    const listener = dgram.createSocket("udp4");

    listener.bind(SERVER_PORT, "255.255.255.255", function () {
        observer.emit("listening")
    });


    listener.on("message", function (message, rinfo) {
        console.log('Message from: ' + rinfo.address + ':' + rinfo.port);

        const computadora = JSON.parse(message.toString());

        if (computadora["MAGIC_WORD"] == MAGIC_WORD) {
            // aca se levanta el evento de nueva computadora asociada
            observer.emit("new_computer", computadora);
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
module.exports.imprimirIPS = imprimirIPS;


//suscribiendo a los eventos
observer.on("listening", () => {
    console.log("listening!!");
})

observer.on("new_computer", (computer) => {
    console.log(JSON.stringify(computer));
});

observer.on("hello", () => {
    console.log("helloworldof events");
});


listenForBroadcasts();