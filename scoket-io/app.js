const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Use EJS as the template engine

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {
    console.log("Socket is connected:", client.id);

    // Handle 'message' event from client
    client.on("message", (msg) => {
        console.log("Message received from client:", msg);
        client.broadcast.emit("message", `private chat: ${msg}`); // Broadcast message to all clients
    });

    client.on('event', (data) => {
        console.log("Event received:", data);
    });

    client.on('disconnect', () => {
        console.log("Socket disconnected:", client.id);
    });
});

// Render index.ejs when accessing the root route
app.get('/', (req, res) => {
    res.render("index");
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
