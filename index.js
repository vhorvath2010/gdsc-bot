const express = require('express');
const path = require('path');
const { WebClient } = require("@slack/web-api");

// Setup express router
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

// Setup Slack api
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

// Basic homepage info
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

// Load auto-replies
const replies = require('./replies.json');

// Handle post requests
app.post('/', (req, res) => {
    // Get Event payload
    let payload = req.body;
    // Respond with HTTP 200
    res.sendStatus(200);
    // Logic for responses
    if (payload.event.type === "app_mention") {
        const msg = payload.event.text;
        // Attempt to send hi reponse
        try {
            const userMention = "<@" + payload.event.user + ">";
            reply = "Sorry, " + userMention + ". I don't understand! Try asking a GDSC lead...";
            // Attempt to acquire reply 
            for (key in replies) {
                if (msg.toLowerCase().contains(key)) {
                    reply = replies[key];
                    break;
                }
            }
            // Setup mention placeholders
            reply = reply.replaceAll("%mention%", userMention);
            // Post message
            slack.chat.postMessage({
                channel: payload.event.channel,
                text: msg
            });
        } catch (error) {
            console.error(error);
        }
    }
});

// Startup express
app.listen(
    PORT,
    () => console.log("application running on http://localhost:" + PORT)
);