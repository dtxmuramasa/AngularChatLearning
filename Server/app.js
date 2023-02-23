const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const listen_port = 3333;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(`User [${socket.id}] connected.`);
    io.emit('chat message', `Hello, User ID: [${socket.id}].`);

    socket.on('disconnect', () => {
        console.log(`user disconnected.`);
    });

    socket.on('chat message', (msg) => {
        console.log(`received message: ${msg}`);
        io.emit('chat message', `${socket.id}: ${msg}`);
    });
});

server.listen(listen_port, () => {
    console.log(`listening on *:${listen_port}`);
});
