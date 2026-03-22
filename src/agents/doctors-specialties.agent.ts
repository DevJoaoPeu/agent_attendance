import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { deepSeekModel } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { z } from 'zod'

const doctorsSpeacialtiesSchema = z.object({
  response: z.string(),
})
const structuredModel = deepSeekModel.withStructuredOutput(doctorsSpeacialtiesSchema)

export async function doctorsSpeacialtiesNode(state: typeof AttendanceState.State) {
  const result = await structuredModel.invoke([
    new SystemMessage(`
        Você é especialista em buscar dados de medicos e especialidades...

        Responda apenas para todas a mensagens: "Você entrou no agente medicos e especialidades"
      `),
    new HumanMessage(state.message),
  ])
  return {
    response: result.response
  }
}