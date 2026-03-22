import { tool } from "@langchain/core/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../embeddings/embeddings";

interface SearchDoctorsToolInterface {
    specialty: string
}

export const searchSpecialtiesTool = tool(
    async ({ specialty }: SearchDoctorsToolInterface) => {
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
