import 'dotenv/config'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { db } from './client'

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: 'gemini-embedding-001',
  apiKey: process.env.GEMINI_API_KEY,
})

export interface FaqResult {
  id: string
  question: string
  answer: string
  category: string
  similarity: number
}

export async function searchFaqByEmbedding(query: string, limit = 3): Promise<FaqResult[]> {
  const vector = await embeddings.embedQuery(query)

  const result = await db.query(
    `SELECT f.id, f.question, f.answer, f.category,
            1 - (e.embedding <=> $1::vector) AS similarity
     FROM faq_embeddings e
     JOIN faq f ON f.id = e.faq_id
     ORDER BY e.embedding <=> $1::vector
     LIMIT $2`,
    [JSON.stringify(vector), limit]
  )

  return result.rows
}
