import { Server } from "./server";

export class Socket {
    constructor() {
        this.ws = new WebSocket(Server);
        this.ws.onmessage = this.onMessage;
    }
    sendMessage(message) {
        this.ws.send(message);
    }
    onMessage(callback) {
        this.callback = callback;
    }
    handleMessage(message) {
        if (this.callback) {
            this.callback(message);
        }
    }
}