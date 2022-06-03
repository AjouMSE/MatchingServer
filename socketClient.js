const io = require('socket.io-client');

let option = {
    transports: ['websocket'],
};
const socket = io('http://localhost:8081', option);

socket.on('connect_error', (error) => {
    console.log(error);
});

socket.on('connect', () => {
    console.log('connected');
});

let data = { id: 14 };
socket.emit('Auth', data);

socket.on('Auth', (data) => {
    console.log(data);
});

socket.emit('Auth', data);

socket.on('Auth', (data) => {
    console.log(data);
});

socket.emit('StartMatching');
socket.on('StartMatching', (data) => {
    console.log(data);
});

socket.on('MatchMade', (data) => {
    console.log(data);
});
