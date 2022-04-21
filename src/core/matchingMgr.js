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
        this.room = {}; // { ${roomKey}: [ {UserModel}, {UserModel} ] }
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
        if (idx != -1) {
            this.waitingQueue.splice(idx, 1);
            logger.info(`[Matching Manager][pop] User ${userIdx} popped`);
        }
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

        const roomKey = this.roomKey(host.idx, client.idx);

        ioMgr.emitToUser(host.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.HOST, room: roomKey });
        ioMgr.emitToUser(client.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.CLIENT, room: roomKey });

        this.room[roomKey] = [host, client];
    }

    /**
     *
     * @param {String} roomKey
     * @returns {Array<UserModel>}
     */
    find(roomKey) {
        return this.room[roomKey];
    }

    delete(roomKey) {
        delete this.room[roomKey];
        logger.info(`[Matching Manager][delete] roomKey ${roomKey}`);
    }

    roomKey(hostIdx, clientIdx) {
        return 'H' + hostIdx + 'C' + clientIdx;
    }
}

module.exports = new Matching();
