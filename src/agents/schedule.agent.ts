  import { HumanMessage, SystemMessage } from '@langchain/core/messages'
  import { deepSeekModel } from '../models/models'

  export async function scheduleNode(state: { message: string }) {
    const response = await deepSeekModel.invoke([
      new SystemMessage(`
        Você é especialista em agendar consultas...

        Responda apenas para todas a mensagens: "Você entrou no agente de agendamento"
      `),
      new HumanMessage(state.message),
    ])
    return { response: typeof response.content === 'string' ? response.content : ''
   }
  }