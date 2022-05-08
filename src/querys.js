const query = {
    magica_duel: {
        // user
        selectUser: 'SELECT id, nickname, score, nickname, win, lose, draw FROM user WHERE id = ?',
    },
};

module.exports = query;
