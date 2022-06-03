// Controller
const authController = require('@src/controllers/authController');
const matchingController = require('@src/controllers/matchingController');

// Common
const errors = require('@src/errors');

// Utils
const TYPE = require('@src/utils/type');
const utils = require('@src/utils/utils');

class Router {
    constructor(msg) {
        this.msg = msg;
    }

    async process(socket, data) {
        let rtn = {};

        switch (this.msg) {
            // Auth
            case TYPE.ROUTES.AUTH:
                rtn = await authController.auth(socket, data);
                break;

            // Matching
            case TYPE.ROUTES.START_MATCHING:
                rtn = await matchingController.startMatching(socket, data);
                break;
            case TYPE.ROUTES.CANCEL_MATCHING:
                rtn = await matchingController.cancelMatching(socket, data);
                break;
            case TYPE.ROUTES.SEND_MATCH_CODE:
                rtn = await matchingController.sendMatchCode(socket, data);
                break;

            case TYPE.ROUTES.DUPLICATE_LOGIN:
            case TYPE.ROUTES.MATCH_MADE:
            default:
                throw utils.errorHandling(errors.invalidRequestRouter);
        }

        return rtn;
    }
}

module.exports = Router;
