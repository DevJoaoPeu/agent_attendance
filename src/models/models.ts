import { ChatDeepSeek } from '@langchain/deepseek'

export const deepSeekModel = new ChatDeepSeek({
    model: 'deepseek-chat',
    temperature: 0,
    apiKey: process.env.DEEPSEEK_KEY, 
})