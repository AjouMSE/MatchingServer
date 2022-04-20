// Core
const ioMgr = require('@src/core/ioMgr');

// Model
const UserModel = require('@src/models/userModel');

// Utils
const TYPE = require('@src/utils/type');

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

        if (this.check() == true) {
            this.make();
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

        ioMgr.emitToUser(host.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.HOST });
        ioMgr.emitToUser(client.socketId, TYPE.ROUTES.MATCH_MADE, { type: TYPE.USER_TYPE.CLIENT });
    }
}

module.exports = new Matching();
