import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { z } from 'zod'

const scheduleSchema = z.object({
  response: z.string()
})
const structuredModel = model.withStructuredOutput(scheduleSchema)

export async function scheduleNode(state: typeof AttendanceState.State) {
  const result = await structuredModel.invoke([
    new SystemMessage(`
        Você é especialista em agendar consultas...

        Responda apenas para todas a mensagens: "Você entrou no agente de agendamento"
      `),
    new HumanMessage(state.message),
  ])
  return {
    response: result.response
  }
}