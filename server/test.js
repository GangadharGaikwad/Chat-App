const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

// Test connection
socket.on("connect", () => {
    console.log("Connected to server!");
    
    // Test user joining
    socket.emit("user_join", "TestUser");
});

// Listen for user list updates
socket.on("user_list", (users) => {
    console.log("Current users:", users);
});

// Listen for messages
socket.on("message", (message) => {
    console.log("Received message:", message);
});

// Send a test message after 2 seconds
setTimeout(() => {
    console.log("Sending test message...");
    socket.emit("message", "Hello, this is a test message!");
}, 2000);

// Disconnect after 5 seconds
setTimeout(() => {
    console.log("Disconnecting...");
    socket.disconnect();
}, 5000); 