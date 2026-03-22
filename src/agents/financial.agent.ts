import { SystemMessage } from '@langchain/core/messages'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import { model } from '../models/models'
import { AttendanceState } from '../state/attendance.state'

const agent = createReactAgent({
  llm: model,
  tools: [],
  prompt: new SystemMessage(`
    Você é especialista em assuntos financeiros...

    Responda apenas para todas a mensagens: "Você entrou no agente financeiro"
  `),
})

export async function financialNode(state: typeof AttendanceState.State) {
  const result = await agent.invoke({
    messages: [{ role: 'user', content: state.message }],
  })

  const lastMessage = result.messages.at(-1)
  return { response: String(lastMessage?.content ?? '') }
}