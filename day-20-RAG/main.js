import "dotenv/config";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";

const pdf = "./story.pdf";
import { MistralAIEmbeddings } from "@langchain/mistralai";

const loader = new PDFLoader(pdf);
const documents = await loader.load();
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 150,
  chunkOverlap: 0,
});

const docs = await splitter.splitDocuments(documents);
const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

// const vector = await embeddings(
//   docs.map((doc) => doc.pageContent)

// )
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const pineconeIndex = pinecone.Index("rag-index");



const vectorStore = await PineconeStore.fromDocuments(docs, embeddings, {
  pineconeIndex,
});

// await vectorStore.addDocuments(docs);

console.log("Stored in Pinecone ✅");
