// Core
const matchingMgr = require('@src/core/matchingMgr');
const ioMgr = require('@src/core/ioMgr');

// Model
const UserModel = require('@src/models/userModel');

// Common
const errors = require('@src/errors');

// Utils
const utils = require('@src/utils/utils');
const TYPE = require('@src/utils/type');

exports.startMatching = async function (socket, data) {
    const reqKeys = {};
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userId = socket.userId;
    if (userId == null) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userResponse = await utils.axios.get(`user/${userId}`);
    const userDto = new UserModel().merge(userResponse.data);
    userDto.socketId = socket.id;

    matchingMgr.push(userDto);

    response[resKeys.result] = true;
    return response;
};

exports.cancelMatching = async function (socket, data) {
    const reqKeys = {};
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userId = socket.userId;
    matchingMgr.pop(userId);

    response[resKeys.result] = true;
    return response;
};

exports.sendMatchCode = async function (socket, data) {
    const reqKeys = {
        room: 'room',
        code: 'code',
    };
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userId = socket.userId;
    const roomKey = data[reqKeys.room];
    const code = data[reqKeys.code];

    const users = matchingMgr.find(roomKey);
    if (users == null) {
        throw utils.errorHandling(errors.matchRoomNotFound);
    }
    const client = users.find((x) => x.id != userId);
    if (client == null) {
        matchingMgr.delete(roomKey);
        throw utils.errorHandling(errors.matchRoomClientNotFound);
    }

    ioMgr.emitToUser(client.socketId, TYPE.ROUTES.RECEIVE_MATCH_CODE, { code });

    matchingMgr.delete(roomKey);

    response[resKeys.result] = true;
    return response;
};
