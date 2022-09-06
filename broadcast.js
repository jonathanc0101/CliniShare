var udp = require('dgram');
var ipsGetter = require("./getIp");

let message = JSON.stringify(ipsGetter());
"using strict";

const multicast_addr = "224.1.1.1",
      bin_addr = "0.0.0.0",
      port = 9999;


var listener = udp.createSocket({type:"udp4", reuseAddr:true}),
    sender = udp.createSocket({type:"udp4", reuseAddr:true});

listener.bind(port, multicast_addr, function(){
    listener.addMembership(multicast_addr);
    listener.setBroadcast(true);
});

listener.on("message", function (b, other) {
    console.log(b.toString().trim());
});

process.stdin.on("data", function (data){
    sender.send(data, 0, data.length, port, multicast_addr);
});

