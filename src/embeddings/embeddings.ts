import 'dotenv/config'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { embeddingsModel } from './embedding.model'
import { db } from '../db/client'

export interface FaqResult {
  id: string
  question: string
  answer: string
  category: string
  similarity: number
}

export async function searchFaqByEmbedding(query: string, limit = 3): Promise<FaqResult[]> {
  const vector = await embeddingsModel.embedQuery(query)

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
