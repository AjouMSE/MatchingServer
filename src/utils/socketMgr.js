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
        let userIdx = 0;
        try {
            if (this.socket.userIdx != null) {
                userIdx = this.socket.userIdx;
            }
            logger.info(`[${this.socket.id}][${userIdx}] Request ${this.msg} / ${JSON.stringify(data)}`);

            const router = new Router(this.msg);
            const resData = await router.process(this.socket, data);

            this.emit(userIdx, resData);
        } catch (err) {
            this.error(userIdx, err);
        }
    }

    emit(userIdx, res) {
        this.socket.emit(this.msg, res);
        logger.info(`[${this.socket.id}][${userIdx}] Response ${this.msg} / ${JSON.stringify(res)}`);
    }

    error(userIdx, err) {
        if (config.dev == true) {
            logger.error(err);
        }
        logger.error('[' + this.socket.id + '][' + userIdx + ']ResponseError' + this.msg + ' / ' + JSON.stringify(err));
        this.socket.emit(this.msg, err);
    }
}

module.exports = SocketMgr;
