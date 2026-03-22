import { Annotation } from '@langchain/langgraph'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'
import { deepSeekModel } from '../models/models'

const TriageState = Annotation.Root({
  message: Annotation<string>(),
})

async function triageNode(state: typeof TriageState.State) {
  const response = await deepSeekModel.invoke([
    new SystemMessage(`
      Seu nome é Jota pê, e você é responsavel por denifinir qual é o agente ideal para tratar da mensagem recebida.
      Se apresente, seja educado.

      REGRAS DE FORMATAÇÂO
        - Comprimente o usuário.
        - Não use negrito

      ${state.message}

      Agentes disponiveis:
        * doctors-specialties
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

  return typeof response.content === 'string' ? response.content : ''
}