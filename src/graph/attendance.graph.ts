import { END, START, StateGraph } from "@langchain/langgraph";
import { AttendanceState } from "../state/attendance.state";
import { triageNode } from '../agents/triage.agent'
import { financialNode } from '../agents/financial.agent'
import { scheduleNode } from '../agents/schedule.agent'
import { doctorsSpeacialtiesNode } from '../agents/doctors-specialties.agent'
import { generalNode } from '../agents/general.agent'
import { TriageDestinationInterface } from "../agents/interfaces/agents.interface";


function routerDecision(state: typeof AttendanceState.State): TriageDestinationInterface {
    return state.route ?? 'general'
}

export const graph = new StateGraph(AttendanceState)
    .addNode('triage', triageNode)
    .addNode('financial', financialNode)
    .addNode('schedule', scheduleNode)
    .addNode('doctors_specialties', doctorsSpeacialtiesNode)
    .addNode('general', generalNode)
    .addEdge(START, 'triage')
    .addConditionalEdges('triage', routerDecision, {
        financial: 'financial',
        schedule: 'schedule',
        doctors_specialties: 'doctors_specialties',
        general: 'general'
    })
    .addEdge('financial', END)
    .addEdge('schedule', END)
    .addEdge('doctors_specialties', END)
    .addEdge('general', END)
    .compile()