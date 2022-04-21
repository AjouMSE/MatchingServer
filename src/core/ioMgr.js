// Utils
const logger = require('@src/utils/logger');

class IOService {
    constructor() {
        this.io = null;
    }

    setIO(io) {
        this.io = io;
    }

    getSocket(socketid) {
        return this.io.sockets.sockets[socketid];
    }

    emitToUser(socketId, msg, data) {
        this.io.to(socketId).emit(msg, data);
        logger.info(`[${socketId}] EmitToUser ${msg} / ${JSON.stringify(data)}`);
    }
}

module.exports = new IOService();
