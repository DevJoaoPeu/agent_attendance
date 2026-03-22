 import { Annotation } from '@langchain/langgraph'
 import { TriageDestinationInterface } from
 '../agents/interfaces/agents.interface'

 export const AttendanceState = Annotation.Root({
   message: Annotation<string>(),
   route: Annotation<TriageDestinationInterface | null>(),
   response: Annotation<string>(),
 })
