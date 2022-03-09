const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.post('/', (req, res) => {
    
    const { challenge } = req.body;

    res.status(200).send({
        "challenge": challenge
    })
});

app.listen(
    PORT,
    () => console.log("application running on http://localhost:" + PORT)
);
