// Model
const UserModel = require('@src/models/userModel');

// Common
const querys = require('@src/querys');

// Utils
const dbMgr = require('../database/dbMgr');

/**
 *
 * @param {Number} id User ID
 * @returns {Promise<UserModel>}
 */
exports.getUser = async function (id) {
    const result = await dbMgr.mysql.magica_duel.selectOne(querys.magica_duel.selectUser, id);
    return result;
};
