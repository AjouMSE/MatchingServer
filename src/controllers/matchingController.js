// Core
const matchingMgr = require('@src/core/matchingMgr');

// Model
const UserModel = require('@src/models/userModel');

// Common
const errors = require('@src/errors');

// Utils
const utils = require('@src/utils/utils');

exports.startMatching = async function (socket, data) {
    const reqKeys = {};
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userIdx = socket.userIdx;
    console.log(userIdx);

    const userDto = new UserModel().merge({}); // @todo - get user data from db
    userDto.socketId = socket.id;

    matchingMgr.push(userDto);

    response[resKeys.result] = true;
    return response;
};
