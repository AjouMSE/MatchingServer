const config = {
    dev: true,
    apiUrl: 'http://127.0.0.1',
    port: {
        api: 8080,
        socket: 8081,
    },
    mysql: {
        magica_duel: {
            host: 'magica-duel.cqv2iwkyatop.ap-northeast-2.rds.amazonaws.com',
            port: 3306,
            user: 'root',
            password: 'magicaduel',
            database: 'db_magica_duel',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            multipleStatements: true,
        },
    },
};

module.exports = config;
