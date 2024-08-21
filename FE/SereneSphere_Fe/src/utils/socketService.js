import io from 'socket.io-client';
import { URL } from '../API';
const SOCKET_URL = URL;

class WSService {

    initializeSocket = async (id) => {
        try {

            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                secure: false,
            })
            // console.log("initializing socket", this.socket)

            this.socket.on('connect', (data) => {
                this.socket.emit('create-id-socket', { message: id});
                this.socket.emit('count-messages-un-read', { message:id });
            })

          

            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ====")
            })

            this.socket.on('error', (data) => {
                console.log("socekt error", data)
            })

            // this.socket.on('Server-send-data-messages', (data) => {
            //     console.log("data: "+data)
            // })

        } catch (error) {
            console.log("scoket is not inialized", error)
        }
    }

    emit(event, data = {}) {
        this.socket.emit(event, data)
    }

    on(event, cb) {
        this.socket.on(event, cb)
    }

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }

}

const socketServices = new WSService()

export default socketServices