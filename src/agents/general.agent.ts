  import { HumanMessage, SystemMessage } from '@langchain/core/messages'
  import { deepSeekModel } from '../models/models'

  export async function generalNode(state: { message: string }) {
    const response = await deepSeekModel.invoke([
      new SystemMessage(`
        Você é especialista em assuntos gerais sobre a clinica...

        Responda apenas para todas a mensagens: "Você entrou no agente geral"
      `),
      new HumanMessage(state.message),
    ])
    return { response: typeof response.content === 'string' ? response.content : ''
   }
  }