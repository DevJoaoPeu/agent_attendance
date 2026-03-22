import 'dotenv/config'
import { ChatDeepSeek } from '@langchain/deepseek'
import { ChatAnthropic } from '@langchain/anthropic'
import { ChatOpenAI } from '@langchain/openai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const provider = process.env.LLM_PROVIDER ?? 'gemini'
const modelName = process.env.LLM_MODEL ?? 'gemini-2.5-flash'

function createModel() {
  switch (provider) {
    case 'gemini':
      return new ChatGoogleGenerativeAI({
        model: modelName ?? 'gemini-2.5-flash',
        temperature: 0,
        apiKey: process.env.GEMINI_API_KEY,
      })
    case 'deepseek':
    default:
      return new ChatDeepSeek({
        model: modelName ?? 'deepseek-chat',
        temperature: 0,
        apiKey: process.env.DEEPSEEK_API_KEY,
      })
  }
}

export const model = createModel()
