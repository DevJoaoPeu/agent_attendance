import 'dotenv/config'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'

export const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  model: 'gemini-embedding-001',
  apiKey: process.env.GEMINI_API_KEY,
})
