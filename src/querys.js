const query = {
    master: {
        // tb_game_user
        selectUser: 'SELECT idx, name FROM tb_game_user WHERE idx = ?',
    },
};

module.exports = query;
