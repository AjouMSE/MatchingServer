// Core
const ioMgr = require('@src/core/ioMgr');

// Utils
const TYPE = require('@src/utils/type');
const logger = require('@src/utils/logger');

class SessionMgr {
    constructor() {
        this.sessionStorage = {}; // { ${userId}: socketId }
    }

    /**
     *
     * @param {Number} userId
     */
    push(userId, socketId) {
        if (this.sessionStorage[userId] != null) {
            ioMgr.emitToUser(this.sessionStorage[userId], TYPE.ROUTES.DUPLICATE_LOGIN);
            logger.info(`[Session Manager][push] User ${userId} login duplicated`);
        }

        this.sessionStorage[userId] = socketId;
    }

    /**
     *
     * @param {Number} userId
     */
    pop(userId) {
        delete this.sessionStorage[userId];
    }
}

module.exports = new SessionMgr();
