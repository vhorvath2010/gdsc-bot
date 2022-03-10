const express = require('express');
const path = require('path');

// Setup express router
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

// Basic homepage info
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

// Handle post requests
app.post('/', (req, res) => {
    // Get Event payload
    let payload = req.body;
    // Respond with HTTP 200
    console.log(payload);
    res.sendStatus(200);
});

// Startup express
app.listen(
    PORT,
    () => console.log("application running on http://localhost:" + PORT)
);