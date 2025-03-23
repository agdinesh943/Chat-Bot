const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai'); // Correct import for v4+
require('dotenv').config();

const app = express();
const port = 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Correct initialization for v4+
});

app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: userMessage }]
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ reply: "Error processing your request." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
