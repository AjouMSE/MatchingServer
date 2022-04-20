// https://github.com/ilearnio/module-alias
require('module-alias/register');

const config = require('@root/config');

const SocketServer = require('@root/src/core/socketServer');

const socketServer = new SocketServer({
    port: config.port.socket,
});

socketServer.init();
socketServer.run();
