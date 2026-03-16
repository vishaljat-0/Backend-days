import dotenv from "dotenv";
dotenv.config();
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import * as z from "zod";
import { sendEmail } from "./mail.service.js";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import readline from "readline/promises";

const emailTool = tool(sendEmail, {
  name: "send-email",
  description: "send an email to a user ",
  schema: z.object({
    to: z.string().describe("email of the user"),
    subject: z.string().describe("subject of the email"),
    html: z.string().describe("html of the email"),
    text: z.string().describe("text of the email"),
  }),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
 model: "mistral-small-latest",
   apiKey: process.env.MISTRAL_API_KEY,
});
const agent = createAgent({
  model,
  tools: [emailTool],
  systemPrompt: `
You are a helpful assistant.

Use the send-email tool ONLY when the user explicitly asks to send an email.

After sending the email, respond with a confirmation message like:
"Email has been sent successfully."

Do NOT send the email again unless the user clearly asks to resend it.
`
});

const messages = [];

while (true) {
   try {
    const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

    if (!userInput || !userInput.trim()) continue;

    messages.push(
      new HumanMessage({
        content: userInput,
      })
    );

    const response = await agent.invoke({
      messages,
    });

    const aiMessage = response.messages[response.messages.length - 1];

    messages.push(aiMessage);

    console.log("\x1b[34mAI:\x1b[0m", aiMessage.content);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
