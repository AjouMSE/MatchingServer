// Modules
const socketio = require('socket.io');
const express = require('express');

// Core
const ioMgr = require('@src/core/ioMgr');
const SocketMgr = require('@root/src/core/socketMgr');

// Utils
const logger = require('@src/utils/logger');
const TYPE = require('@src/utils/type');

class SocketService {
    constructor(options) {
        this.port = options.port;
        this.app = express();

        this.http = require('http').createServer(this.app).listen(this.port);
        this.http.keepAliveTimeout = 0;

        // socket.io option
        let option = {
            pingInterval: 5000,
            pingTimeout: 10000,
            transport: ['polling', 'websocket'],
        };
        this.io = socketio(this.http, option);

        // express option
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req, res, next) => {
            let err = new Error('404 Not Found');
            err['status'] = 404;
            next(err);
        });

        this.app.set('port', this.port);
    }

    run() {
        this.io.on('connect', (socket) => {
            logger.info(`[${socket.id}] socket connected`);

            for (let key in TYPE.ROUTES) {
                socket.on(TYPE.ROUTES[key], (data) => {
                    const socketMgr = new SocketMgr(socket, TYPE.ROUTES[key]);
                    socketMgr.message(data);
                });
            }
        });
        ioMgr.setIO(this.io);

        logger.info('socket service running.');
    }
}

module.exports = SocketService;
