// Core
const ioMgr = require('@src/core/ioMgr');

// Model
const UserModel = require('@src/models/userModel');

// Utils
const TYPE = require('@src/utils/type');
const logger = require('@src/utils/logger');

class Matching {
    constructor() {
        /** @type {Array<UserModel>} */ this.waitingQueue = [];
    }

    /**
     *
     * @param {UserModel} user
     */
    push(user) {
        this.waitingQueue.push(user);

        logger.info(`[Matching Manager][push] User ${user.idx} pushed`);

        if (this.check() == true) {
            this.make();
        }
    }

    /**
     *
     * @param {Number} userIdx
     */
    pop(userIdx) {
        const idx = this.waitingQueue.findIndex((x) => x.idx == userIdx);
        this.waitingQueue.splice(idx, 1);

        logger.info(`[Matching Manager][pop] User ${userIdx} popped`);
    }

    check() {
        if (this.waitingQueue.length >= 2) {
            return true;
        }
        return false;
    }

    make() {
        const host = this.waitingQueue.shift();
        const client = this.waitingQueue.shift();

        logger.info(`[Matching Manager][make] User ${host.idx} host / User ${client.idx} client`);

        ioMgr.emitToUser(host.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.HOST });
        ioMgr.emitToUser(client.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.CLIENT });
    }
}

module.exports = new Matching();
