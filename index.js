const path = require('path');
const { App } = require('@slack/bolt');
require('dotenv').config();

// Setup Slack app
const PORT = process.env.PORT;
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
})

// Listens to incoming messages that contain "hello"a
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
});

// Start Slack
(async () => {
    // Start the app
    await app.start(process.env.PORT);

    console.log('⚡️ Bolt app is running!');
})();
