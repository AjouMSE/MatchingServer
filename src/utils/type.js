exports.ROUTES = Object.freeze({
    AUTH: 'Auth',
    DUPLICATE_LOGIN: 'DuplicateLogin',
    DISCONNECT: 'disconnect',

    START_MATCHING: 'StartMatching',
    CANCEL_MATCHING: 'CancelMatching',

    SEND_MATCH_CODE: 'SendMatchCode',
    RECEIVE_MATCH_CODE: 'ReceiveMatchCode',

    MATCH_MADE: 'MatchMade',
});

exports.USER_TYPE = Object.freeze({
    HOST: 0,
    CLIENT: 1,
});
