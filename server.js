const express = require("express");
const cors = require("cors");
require("dotenv").config();

const Groq = require("groq-sdk");
const { HindsightClient } = require("@vectorize-io/hindsight-client");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const hindsight = new HindsightClient({
    baseUrl: process.env.HINDSIGHT_BASE_URL,
    apiKey: process.env.HINDSIGHT_API_KEY
});

const BANK_ID = "evermind-test";

app.get("/", (req, res) => {
    res.json({
        message: "EverMind backend is running"
    });
});

app.get("/test-hindsight", async (req, res) => {
    try {
        const result = await hindsight.retain(
            BANK_ID,
            "EverMind is testing Hindsight memory."
        );

        res.json({
            success: true,
            message: "Hindsight memory stored successfully",
            result
        });
    } catch (error) {
        console.error("Hindsight error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get("/test-recall", async (req, res) => {
    try {
        const result = await hindsight.recall(
            BANK_ID,
            "What do you know about EverMind?"
        );

        res.json({
            success: true,
            message: "Hindsight memory recalled successfully",
            result
        });
    } catch (error) {
        console.error("Hindsight recall error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required"
            });
        }

        const memoryResult = await hindsight.recall(
            BANK_ID,
            message,
            {
                maxTokens: 3000,
                budget: "mid"
            }
        );

        const memories = memoryResult.results || [];

        const memoryContext = memories.length > 0
            ? memories.map((memory) => `- ${memory.text}`).join("\n")
            : "No relevant previous memories found.";

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content: `You are EverMind, an AI customer support memory agent.

Use the user's current message and relevant memories to give a helpful, personalized response.

Relevant memories from Hindsight:
${memoryContext}

If the memories are relevant, use them naturally.
Do not claim to remember something that is not present in the memories.
Be concise, friendly, and helpful.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.4,
            max_tokens: 500
        });

        const reply = completion.choices[0].message.content;

        await hindsight.retain(
            BANK_ID,
            `Customer said: ${message}\nEverMind responded: ${reply}`
        );

        res.json({
            success: true,
            message,
            reply,
            memories
        });

    } catch (error) {
        console.error("Chat error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`EverMind backend running on port ${PORT}`);
});