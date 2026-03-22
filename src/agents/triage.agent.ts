import { Annotation } from '@langchain/langgraph'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { deepSeekModel } from '../models/models'

const TriageState = Annotation.Root({
  message: Annotation<string>(),
})

async function triageNode(state: typeof TriageState.State) {
  const response = await deepSeekModel.invoke([
    new SystemMessage(`Regras para o agent de triagem...`),
    new HumanMessage(state.message),
  ])

  return typeof response.content === 'string' ? response.content : ''
}