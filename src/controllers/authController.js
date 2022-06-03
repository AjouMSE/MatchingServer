// Core
const sessionMgr = require('@src/core/sessionMgr');

// Common
const errors = require('@src/errors');

// Utils
const utils = require('@src/utils/utils');

exports.auth = async function (socket, data) {
    const reqKeys = {
        id: 'id',
    };
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userId = data[reqKeys.id];
    socket.userId = userId;

    sessionMgr.push(userId, socket.id);

    response[resKeys.result] = true;
    return response;
};
