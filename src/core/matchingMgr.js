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

        logger.info(`[Matching Manager][push] User ${user.id} pushed`);

        if (this.check() == true) {
            this.make();
        }
    }

    /**
     *
     * @param {Number} userId
     */
    pop(userId) {
        const id = this.waitingQueue.findIndex((x) => x.id == userId);
        if (id != -1) {
            this.waitingQueue.splice(id, 1);
            logger.info(`[Matching Manager][pop] User ${userId} popped`);
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

        logger.info(`[Matching Manager][make] User ${host.id} host / User ${client.id} client`);

        const roomKey = this.roomKey(host.id, client.id);

        ioMgr.emitToUser(host.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.HOST, room: roomKey, hostile: client });
        ioMgr.emitToUser(client.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.CLIENT, room: roomKey, hostile: host });

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

    roomKey(hostId, clientId) {
        return 'H' + hostId + 'C' + clientId;
    }
}

module.exports = new Matching();
