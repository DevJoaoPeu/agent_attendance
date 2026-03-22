import { tool } from "langchain";
import z from "zod";

export const searchSpecialtiesTool = tool(
    async ({ specialty }) => {}, {
        name: 'search_doctors',
        description: `
            Usada para listas medicos com ou sem a especialidade.
        `
        schema: z.object({
            specialty: z.string().optional().describe('Especialidade buscada')
        })
    }   
)