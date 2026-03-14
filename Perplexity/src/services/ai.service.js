import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const testfn = async () => {
  try {

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const res = await model.invoke("Hello, how are you?");

    console.log(res.content);

  } catch (error) {
    console.error("AI ERROR:", error);
  }
};