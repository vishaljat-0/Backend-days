import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";
import * as z from "zod";

import { searchOnInternet } from "./internet.service.js";

// export const genrateResponce = (messages) => {
//   const model = new ChatGoogleGenerativeAI({
//     model: "gemini-2.5-flash-lite",
//     apiKey: process.env.GOOGLE_API_KEY,
//   });

//   console.log(messages);
//   const responce = model.invoke(
//     messages.map((msg) => {
//       if (msg.role === "user") {
//         return new HumanMessage(msg.content);
//       } else if (msg.role === "ai") {
//         return new AIMessage(msg.content);
//       }
//     }),
//   );
//   return responce;
// };

const searchInternetTool = tool(searchOnInternet, {
  name: "searchInternet",
  description: "Use this tool to get the latest information from the internet.",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet."),
  }),
});

export const genrateResponce = async (messages, onChunk = null) => {
  const mistralModel = new ChatMistralAI({
    // ✅ Groq → Mistral
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    streaming: onChunk ? true : false,
  });

  const agent = createAgent({
    model: mistralModel,
    tools: [searchInternetTool],
  });

  // STREAMING mode
  if (onChunk) {
    const eventStream = agent.streamEvents(
      {
        messages: [
          new SystemMessage(`
          You are a helpful and precise assistant for answering questions.
          If you don't know the answer, say you don't know.
          If the question requires up-to-date information, use the "searchInternet" tool.
        `),
          ...messages.map((msg) => {
            if (msg.role === "user") return new HumanMessage(msg.content);
            else if (msg.role === "ai") return new AIMessage(msg.content);
          }),
        ],
      },
      { version: "v2" },
    );

    let fullResponse = "";

    for await (const event of eventStream) {
      if (event.event === "on_chat_model_stream") {
        console.log("full chunk", JSON.stringify(event.data?.chunk));
        const text =
          event.data?.chunk?.kwargs?.content ||
          event.data?.chunk?.content ||
          "";
        console.log("text chunk", text); // 👈 add this

        if (text && text.length > 0) {
          // 👈 only if text is not empty
          fullResponse += text;
          onChunk(text);
        }
      }
    }

    return fullResponse;
  }
  const responce = await agent.invoke({
    messages: [
      new SystemMessage(`
        You are a helpful assistant.
  Today's date is: ${new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
    You are a helpful and precise assistant for answering questions.
    If you don't know the answer, say you don't know. 
   STRICT RULES — follow these exactly:
  - For ANY question about news, current events, sports scores, stock prices, weather, or anything that may have changed recently — you MUST call the "searchInternet" tool. No exceptions.
  - Do NOT answer from memory for real-time topics. Always search first.
  - For date/time questions use the date provided above.
 
            `),
      ...messages.map((msg) => {
        if (msg.role == "user") {
          return new HumanMessage(msg.content);
        } else if (msg.role == "ai") {
          return new AIMessage(msg.content);
        }
      }),
    ],
  });
  return responce.messages[responce.messages.length - 1].text;
};

export const chatTitle = (message) => {
  const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const responce = mistralModel.invoke([
    new SystemMessage(
      `  You are a helpful assistant that generates concise and descriptive titles for chat conversations.
              
              User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.    
          `,
    ),
    new HumanMessage(message),
  ]);
  return responce;
};
