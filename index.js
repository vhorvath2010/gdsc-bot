const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

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
