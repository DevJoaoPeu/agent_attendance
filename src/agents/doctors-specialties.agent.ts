import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { z } from 'zod'

const doctorsSpeacialtiesSchema = z.object({
  response: z.string(),
})
const structuredModel = model.withStructuredOutput(doctorsSpeacialtiesSchema)

export async function doctorsSpeacialtiesNode(state: typeof AttendanceState.State) {
  const result = await structuredModel.invoke([
    new SystemMessage(`
        Você é especialista em buscar dados de medicos e especialidades...

        FERRAMENTAS PARA BUSCA
          - search_doctors
          * use para buscar medicos pela especialidade, ou apenas pelo nome
          - search_specialties
          * use para buscar especialidades
      `),
    new HumanMessage(state.message),
  ])
  return {
    response: result.response
  }
}