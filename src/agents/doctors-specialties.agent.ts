  import { HumanMessage, SystemMessage } from '@langchain/core/messages'
  import { deepSeekModel } from '../models/models'

  export async function doctorsSpeacialtiesNode(state: { message: string }) {
    const response = await deepSeekModel.invoke([
      new SystemMessage(`Você é especialista em buscar dados de medicos e especialidades...`),
      new HumanMessage(state.message),
    ])
    return { response: typeof response.content === 'string' ? response.content : ''
   }
  }