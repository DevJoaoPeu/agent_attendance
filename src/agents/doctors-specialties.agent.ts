import { SystemMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { searchDoctorsTool } from '../tools/search_doctors.tool'
import { searchSpecialtiesTool } from '../tools/search_specialties.tool'

const agent = createReactAgent({
  llm: model,
  tools: [searchDoctorsTool, searchSpecialtiesTool],
  prompt: new SystemMessage(`
    Você é especialista em buscar dados de médicos e especialidades de uma clínica médica.

    REGRAS OBRIGATÓRIAS:
    - SEMPRE use uma das ferramentas disponíveis antes de responder. Nunca responda sem consultar as ferramentas.
    - Para perguntas sobre um médico específico (nome, especialidade, disponibilidade), use search_doctors.
    - Para perguntas sobre quais especialidades a clínica oferece, use search_specialties.
    - Se não encontrar resultados, informe que não há dados disponíveis sobre o que foi solicitado.
  `),
})

export async function doctorsSpeacialtiesNode(state: typeof AttendanceState.State) {
  const result = await agent.invoke({
    messages: [{ role: 'user', content: state.message }],
  })

  const lastMessage = result.messages.at(-1)
  return { response: String(lastMessage?.content ?? '') }
}
