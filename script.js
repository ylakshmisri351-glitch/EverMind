const API_URL = "http://localhost:5000";

const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const memoryList = document.getElementById("memoryList");
const memoryCount = document.getElementById("memoryCount");

function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = `message ${type}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = type === "user" ? "U" : "E";

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;

    message.appendChild(avatar);
    message.appendChild(bubble);

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showMemories(memories) {
    memoryList.innerHTML = "";

    if (!memories || memories.length === 0) {
        memoryCount.textContent = "0";

        const empty = document.createElement("div");
        empty.className = "empty-memory";
        empty.textContent = "No memories recalled yet.";

        memoryList.appendChild(empty);
        return;
    }

    memoryCount.textContent = memories.length;

    memories.forEach((memory) => {
        const card = document.createElement("div");
        card.className = "memory-card";

        const type = document.createElement("div");
        type.className = "memory-type";
        type.textContent = memory.type || "memory";

        const text = document.createElement("div");
        text.textContent = memory.text;

        card.appendChild(type);
        card.appendChild(text);

        memoryList.appendChild(card);
    });
}

async function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage(message, "user");

    messageInput.value = "";
    sendButton.disabled = true;
    sendButton.textContent = "Sending...";

    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.error || "Something went wrong");
        }

        addMessage(data.reply, "assistant");

        showMemories(data.memories);

    } catch (error) {
        console.error("Chat error:", error);

        addMessage(
            "Sorry, I couldn't connect to the EverMind backend.",
            "assistant"
        );
    }

    sendButton.disabled = false;
    sendButton.textContent = "Send";

    messageInput.focus();
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});