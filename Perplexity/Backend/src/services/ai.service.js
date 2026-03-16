import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const testfn = async () => {

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GOOGLE_API_KEY
  });

  const res = await model.invoke("What is the capital of India?");

  console.log(res.content);

};