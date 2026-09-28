# EverMind

## AI Customer Support Agent That Learns Using Hindsight

EverMind is an AI-powered customer support agent that remembers previous customer interactions and uses those memories to provide more personalized and context-aware support.

Unlike a traditional chatbot that treats every conversation as new, EverMind uses **Hindsight** as a persistent memory layer. It can recall previous customer issues, solutions, and conversation context and use that information when responding to future requests.

---

## Problem

Traditional AI customer support systems often forget previous conversations.

When a customer contacts support again, they may have to:

* Explain the same problem again
* Repeat information they already provided
* Remind the support agent about previous solutions
* Start the troubleshooting process from the beginning

This creates a frustrating customer experience and also increases repetitive work for support teams.

---

## Solution

EverMind gives the AI agent persistent memory.

The agent can:

1. Receive a customer message.
2. Recall relevant previous experiences using Hindsight.
3. Provide the recalled context to the LLM.
4. Generate a personalized response.
5. Store the new interaction back into Hindsight.
6. Use that experience in future conversations.

This creates a continuous learning loop.

```text
Customer
   ↓
EverMind UI
   ↓
Node.js Backend
   ↓
Hindsight Recall
   ↓
Relevant Memories
   ↓
Groq LLM
   ↓
Personalized Response
   ↓
Hindsight Retain
   ↓
Future Conversations
```

---

## Why Hindsight Matters

Hindsight is the core memory layer of EverMind.

Without memory:

```text
Customer:
My payment is failing again.

AI:
Please provide details about your payment problem.
```

With Hindsight:

```text
Customer:
My payment is failing again.

EverMind:
I remember you experienced a payment issue previously.
Let's continue from where we left off.
```

The agent can use information from previous interactions instead of treating every conversation as completely new.

---

## Example

### First Interaction

Customer:

> My payment failed yesterday.

EverMind processes the request and stores the interaction in Hindsight.

### Later Interaction

Customer:

> My payment is failing again. Do you remember what happened?

EverMind recalls the previous payment issue and uses that memory when generating the response.

This demonstrates how persistent memory can improve customer support over multiple interactions.

---

## Key Features

### Persistent Memory

EverMind stores customer interactions using Hindsight so information can be recalled later.

### Contextual Recall

Relevant memories are retrieved based on the customer's current message.

### Personalized Responses

The recalled memories are provided to the LLM so the response can take previous interactions into account.

### Continuous Memory Loop

Every interaction can become useful context for future conversations.

### Visible Memory

The application displays recalled Hindsight memories in the interface, making the agent's memory process visible during the demo.

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### AI

* Groq
* `openai/gpt-oss-120b`

### Memory

* Hindsight by Vectorize

### APIs

* Hindsight API
* Groq API

---

## Hindsight Memory Flow

EverMind uses two important memory operations.

### Recall

When a customer sends a message:

```text
Customer Message
       ↓
Hindsight Recall
       ↓
Relevant Previous Memories
```

The retrieved memories are then included in the AI's context.

### Retain

After generating a response:

```text
Customer Message
       +
EverMind Response
       ↓
Hindsight Retain
       ↓
Persistent Memory
```

This allows future conversations to benefit from previous interactions.

---

## Project Structure

```text
EverMind
│
├── backend
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   │
│   └── frontend
│       ├── index.html
│       ├── style.css
│       └── script.js
│
└── .gitignore
```

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Open the backend

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file inside the `backend` folder.

```env
HINDSIGHT_BASE_URL=https://api.hindsight.vectorize.io
HINDSIGHT_API_KEY=your_hindsight_api_key
GROQ_API_KEY=your_groq_api_key
```

Do not commit `.env` or API keys to GitHub.

### 5. Start the backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Open the frontend

Open:

```text
backend/frontend/index.html
```

using a local web server such as VS Code Live Server.

---

## Demo Scenario

A simple demonstration of EverMind's memory capability:

### Interaction 1

```text
My payment failed yesterday.
```

### Interaction 2

```text
I enabled online transactions and that fixed it.
```

### Interaction 3

```text
My payment is failing again. Do you remember what fixed it last time?
```

EverMind recalls the previous interaction and uses the stored context to generate a more personalized response.

The Hindsight Memory panel also displays the memories recalled for the current conversation.

---

## Hackathon Focus

EverMind is built around the central idea:

> AI agents should not forget what happened before.

The project demonstrates how persistent memory can transform a conventional chatbot into an agent that can build context across interactions.

The goal is not simply to remember conversations, but to make previous experiences useful for future interactions.

---

## Future Improvements

Potential future extensions include:

* Customer profiles and history
* Issue resolution tracking
* Remembering successful troubleshooting steps
* Ticket creation and tracking
* Automatic escalation of unresolved issues
* Analytics for recurring customer problems
* Integration with CRM systems
* Multi-customer memory isolation
* Long-term support history

---

## Hackathon

Built for the **AI Agents That Learn Using Hindsight** hackathon.

### Core Technology

**Hindsight by Vectorize**

### Project

**EverMind — AI Customer Support Agent with Persistent Memory**

---

## Security

API keys are stored in environment variables and are not included in the GitHub repository.

The `.env` file is excluded using `.gitignore`.

---

## License

This project was created as a hackathon project.

