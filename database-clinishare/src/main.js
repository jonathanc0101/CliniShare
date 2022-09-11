import { main } from "./index.js";

import {listenForBroadcasts} from "./UDP/broadcastListener.js";
import { broadcastComputerData } from "./UDP/broadcastSender.js";

//starting database server
main();

//starting broadcast listener
listenForBroadcasts();

//broadcast self to network after a few seconds
broadcastComputerData();

setInterval(broadcastComputerData, 15000);

// ValidBroadcasts();