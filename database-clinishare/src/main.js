import { main } from "./index.js";

import events from "./eventos/events.js";

import {listenForBroadcasts} from "./UDP/broadcastListener.js";
import { broadcastComputerData } from "./UDP/broadcastSender.js";

//starting database server
main();

//starting broadcast listener
listenForBroadcasts();

//broadcast self to network

broadcastComputerData();

// ValidBroadcasts();