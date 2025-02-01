const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    }
});


// Store connected users
const users = new Map();


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining
    socket.on('user_join', (username) => {
        users.set(socket.id, username);
        io.emit('user_list', Array.from(users.values()));
        io.emit('message', {
            type: 'system',
            content: `${username} joined the chat`
        });
    });


    // Handle chat messages
    socket.on('message', (message) => {
        const username = users.get(socket.id);
        io.emit('message', {
            type: 'user',
            content: message,
            sender: username
        });
    });


    // Handle disconnection
    socket.on('disconnect', () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit('user_list', Array.from(users.values()));
            io.emit('message', {
                type: 'system',
                content: `${username} left the chat`
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 