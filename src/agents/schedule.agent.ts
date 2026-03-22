  import { HumanMessage, SystemMessage } from '@langchain/core/messages'
  import { deepSeekModel } from '../models/models'

  export async function scheduleNode(state: { message: string }) {
    const response = await deepSeekModel.invoke([
      new SystemMessage(`Você é especialista em agendar consultas...`),
      new HumanMessage(state.message),
    ])
    return { response: typeof response.content === 'string' ? response.content : ''
   }
  }