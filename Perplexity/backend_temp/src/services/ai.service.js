import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import *as z from "zod"



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


const searchInternetTool = tool(
  searchOnInternet,
  {
    name:"searchInternet",
    description:"Use this tool to get the latest information from the internet.",
     schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })

  }


)


 
export const genrateResponce = async  (messages) => {
   const mistralModel = new ChatMistralAI({    // ✅ Groq → Mistral
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
  });

  const agent = createAgent({
      model:mistralModel,        
      tools: [searchInternetTool]
  
})

  const responce = await agent.invoke({
    messages:[
 new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
             ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            }))
    ]
    
  });
 return responce.messages[ responce.messages.length - 1 ].text;};

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
