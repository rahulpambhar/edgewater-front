import io from "socket.io-client";

import { WSS_URL } from "../env"


const socket = io(`${WSS_URL}`, {
    transports: ['websocket'],
    autoConnect: true,
    // path: '/api/socket.io/',
});

export default socket;