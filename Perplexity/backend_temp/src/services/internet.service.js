import { tavily } from "@tavily/core";

export const searchOnInternet = async ({ query }) => {
    console.log("🔍 Tavily tool called with query:", query); // ← add this

  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
  const results = await tvly.search(query, {  // ✅ tvly — instance use karo
    maxResults: 5,
  });
  return JSON.stringify(results);
};