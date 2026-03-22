import { tool } from "langchain/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../db/embeddings";

export const searchSpecialtiesTool = tool(
    async ({ specialty }) => {
        const rows = await searchFaqByEmbedding(specialty)

        if (rows.length === 0) return 'Nenhuma especialidade encontrada.'

        return rows
            .map((r) => `[${r.category}] P: ${r.question}\nR: ${r.answer}`)
            .join('\n\n')
    },
    {
        name: 'search_specialties',
        description: 'Usada para listar especialidades médicas disponíveis.',
        schema: z.object({
            specialty: z.string().describe('Especialidade buscada'),
        }),
    }
)
