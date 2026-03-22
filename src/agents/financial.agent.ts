import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { deepSeekModel } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { z } from 'zod'

const financialSchema = z.object({
  response: z.string()
})
const structuredModel = deepSeekModel.withStructuredOutput(financialSchema)

export async function financialNode(state: typeof AttendanceState.State) {
  const result = await structuredModel.invoke([
    new SystemMessage(`
        Você é especialista em assuntos financeiros...

        Responda apenas para todas a mensagens: "Você entrou no agente financeiro"
      `),
    new HumanMessage(state.message),
  ])
  return {
    response: result.response
  }
}