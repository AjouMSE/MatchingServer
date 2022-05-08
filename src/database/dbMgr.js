// Common
const config = require('@root/config');
const errors = require('@src/errors');

// Utils
const utils = require('@src/utils/utils');

// DB
const MySQL = require('@src/database/mysql');

const mysqlConn = {
    magica_duel: 'magica_duel',
};

class dbMgr {
    constructor() {
        this.mysql = {
            magica_duel: /** @type {MySQL} */ (null),
        };
    }

    get mysqlConn() { return mysqlConn; } // prettier-ignore

    async init() {
        for (let dbName in this.mysql) {
            if (config.mysql[dbName] == null) {
                throw utils.errorHandling(errors.undefinedConfig);
            }

            let initMySql = new MySQL();
            await initMySql.createPool(config.mysql[dbName]);

            this.mysql[dbName] = initMySql;
        }
    }

    /**
     *
     * @param {typeof mysqlConn} dbConn
     * @param {Array<String>} querys
     */
    async set(dbConn, querys) {
        if (querys.length > 0) {
            const mysqlObj = /** @type {MySQL} */ (this.mysql[dbConn]);
            const mysqlQuerys = mysqlObj.makeMultipleQuery(querys);
            const mysqlConn = await mysqlObj.beginTransaction();

            try {
                await mysqlObj.query(mysqlConn, mysqlQuerys);
                await mysqlObj.commit(mysqlConn);
            } catch (err) {
                await mysqlObj.rollback(mysqlConn);
                throw err;
            }
        }
    }
}

module.exports = new dbMgr();
