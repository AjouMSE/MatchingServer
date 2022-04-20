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

    // Customer
    invalidCustomerEmail: {
        code: 11001,
        message: 'invalid customer email',
    },
    customerPasswordMismatch: {
        code: 11002,
        message: 'customer password mismatch',
    },
    duplicatedEmail: {
        code: 11003,
        message: 'duplicated email',
    },
    unauthorized: {
        code: 11004,
        message: 'customer unauthorized',
    },
    invalidCustomerId: {
        code: 11005,
        message: 'invalid customer id',
    },

    // Store
    invalidStoreId: {
        code: 12001,
        message: 'invalid store id',
    },
    customFieldMismatch: {
        code: 12002,
        message: 'custom field mismatch',
    },

    // Product
    invalidProductId: {
        code: 13001,
        message: 'invalid product id',
    },

    // Order
    invalidOrderId: {
        code: 14001,
        message: 'invalid order id',
    },
    orderAlreadyRefunded: {
        code: 14002,
        message: 'order already refunded',
    },
    invalidProductIncluded: {
        code: 14002,
        message: 'invalid product included',
    },
};

module.exports = errors;
