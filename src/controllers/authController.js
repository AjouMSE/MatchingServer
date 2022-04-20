// Model
const UserModel = require('@src/models/userModel');

// Common
const errors = require('@src/errors');

// Utils
const utils = require('@src/utils/utils');

exports.auth = async function (socket, data) {
    const reqKeys = {
        idx: 'idx',
    };
    const resKeys = {
        result: 'result',
    };

    const response = {};

    if (utils.hasKeys(reqKeys, data) == false) {
        throw utils.errorHandling(errors.invalidRequestData);
    }

    const userIdx = data[reqKeys.idx];
    socket.userIdx = userIdx;

    response[resKeys.result] = true;
    return response;
};
