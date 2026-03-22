import { SystemMessage } from '@langchain/core/messages'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'
import { createReactAgent } from '@langchain/langgraph/prebuilt'

const agent = createReactAgent({
  llm: model,
  tools: [],
  prompt: new SystemMessage(`
    Você é especialista em assuntos gerais sobre a clinica...

    Responda apenas para todas a mensagens: "Você entrou no agente geral"
  `),
})

export async function scheduleNode(state: typeof AttendanceState.State) {
  const result = await agent.invoke({
    messages: [{ role: 'user', content: state.message }],
  })

  const lastMessage = result.messages.at(-1)
  return { response: String(lastMessage?.content ?? '') }
}