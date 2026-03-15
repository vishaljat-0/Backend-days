import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

const messages = [];

while (true) {

  const userInput = await askQuestion("\x1b[32mYou:\x1b[0m ");

  if (userInput.toLowerCase() === "exit") {
    console.log("Goodbye 👋");
    rl.close();
    process.exit(0);
  }

  // push user message
  messages.push({
    role: "user",
    content: userInput
  });

  // send full conversation
  const response = await model.invoke(messages);

  // push AI message
  messages.push({
    role: "assistant",
    content: response.content
  });

  console.log("\x1b[34mAI:\x1b[0m", response.content);
} 