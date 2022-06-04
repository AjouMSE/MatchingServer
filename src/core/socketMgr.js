// Common
const config = require('@root/config');

const utils = require('@src/utils/utils');
const logger = require('@src/utils/logger');

// Routes
const Router = require('@src/routes/router');

class SocketMgr {
    constructor(socket, msg) {
        this.socket = socket;
        this.msg = msg;
    }

    async message(data) {
        let userId = 0;
        try {
            if (this.socket.userId != null) {
                userId = this.socket.userId;
            }
            logger.info(`[${this.socket.id}][${userId}] Request ${this.msg} / ${JSON.stringify(data)}`);

            const router = new Router(this.msg);
            const resData = await router.process(this.socket, data);

            if (resData != null) {
                this.emit(userId, resData);
            }
        } catch (err) {
            this.error(userId, err);
        }
    }

    emit(userId, res) {
        this.socket.emit(this.msg, res);
        logger.info(`[${this.socket.id}][${userId}] Response ${this.msg} / ${JSON.stringify(res)}`);
    }

    error(userId, err) {
        if (config.dev == true) {
            logger.error(err);
        }
        logger.error('[' + this.socket.id + '][' + userId + ']ResponseError' + this.msg + ' / ' + JSON.stringify(err));
        this.socket.emit(this.msg, err);
    }
}

module.exports = SocketMgr;
