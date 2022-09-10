import { main } from "./index.js";

import {listenForBroadcasts} from "./UDP/broadcastListener.js";

//starting database server
main();

//starting broadcast listener
listenForBroadcasts();