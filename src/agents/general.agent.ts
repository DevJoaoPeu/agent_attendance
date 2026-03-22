import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { z } from 'zod'

const generalSchema = z.object({
  response: z.string()
})
const structuredModel = model.withStructuredOutput(generalSchema)

export async function generalNode(state: typeof AttendanceState.State) {
  const result = await structuredModel.invoke([
    new SystemMessage(`
        Você é especialista em assuntos gerais sobre a clinica...

        Responda apenas para todas a mensagens: "Você entrou no agente geral"
      `),
    new HumanMessage(state.message),
  ])
  return {
    response: result.response
  }
}