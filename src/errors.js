const Type = require('@root/src/utils/type');

const errors = {
    undefinedError: {
        code: 1,
        message: 'undefined error',
    },
    undefinedServer: {
        code: 2,
        message: 'undefined server',
    },
    undefinedConfig: {
        code: 3,
        message: 'undefined config',
    },
    undefinedModule: {
        code: 4,
        message: 'undefined module',
    },

    // DataBases
    failedQuery: {
        code: 1001,
        message: 'failed query',
    },
    failedCache: {
        code: 1002,
        message: 'failed cache',
    },

    // Common
    invalidSessionStore: {
        code: 10001,
        message: 'invalid session store',
    },
    invalidRequestRouter: {
        code: 10002,
        message: 'invalid request router',
    },
    invalidRequestData: {
        code: 10003,
        message: 'invalid request data',
    },
    invalidResponseData: {
        code: 10004,
        message: 'invalid response data',
    },
    invalidResponseData: {
        code: 10004,
        message: 'invalid response data',
    },

    // Matching
    matchRoomNotFound: {
        code: 11001,
        message: 'match room not found',
    },
    matchRoomClientNotFound: {
        code: 11002,
        message: 'match room client not found',
    },
};

module.exports = errors;
