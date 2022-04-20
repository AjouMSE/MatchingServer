const config = {
    dev: true,
    baseUrl: 'http://127.0.0.1',
    port: {
        socket: 8081,
    },
    mysql: {
        master: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'db_master',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            multipleStatements: true,
        },
    },
    redis: {
        user: {
            host: '127.0.0.1',
            port: 6379,
            db: 0,
        },
    },
};

module.exports = config;
