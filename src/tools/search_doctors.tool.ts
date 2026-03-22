import { tool } from "langchain";
import z from "zod";

export const searchDoctorsTool = tool(
    async ({ doctorName, specialty }) => {}, {
        name: 'search_doctors',
        description: `
            Usada para listas medicos com ou sem a especialidade.
        `
        schema: z.object({
            doctorName: z.string().describe('Nome do medico'),
            specialty: z.string().optional().describe('Especialidade do medico')
        })
    }
)