import { Annotation } from '@langchain/langgraph'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { model } from '../models/models'
import { z } from 'zod'
import { AttendanceState } from '../state/attendance.state'

const routeSchema = z.object({
  route: z.enum(['doctors_specialties', 'general', 'financial', 'schedule'])
})
const structuredModel = model.withStructuredOutput(routeSchema)

export async function triageNode(state: typeof AttendanceState.State) {
  const response = await structuredModel.invoke([
    new SystemMessage(`
      Seu nome é Jota pê, e você é responsavel por denifinir 
      qual é o agente ideal para tratar da mensagem recebida.

      Agentes disponiveis:
        * doctors_specialties
          - Responsavel por buscar dados de medicos e especialidades
        * general
          - Duvidas sobre a clinica, endereço, horarios e etc
        * financial
          - Duvidas sobre valores de consultas e exames.
        * schedule
          - Usado para agendar uma consulta ou exame.
    `),
    new HumanMessage(state.message),
  ])

  return { route: response.route }
}