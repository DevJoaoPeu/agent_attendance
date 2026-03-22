import { tool } from "@langchain/core/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../embeddings/embeddings";

interface SearchDoctorsToolInterface {
    query: string
}

export const searchDoctorsTool = tool(
    async ({ query }: SearchDoctorsToolInterface) => {
        const rows = await searchFaqByEmbedding(query)

        if (rows.length === 0) return 'Nenhum médico encontrado.'

        return rows
            .map((r) => `[${r.category}] P: ${r.question}\nR: ${r.answer}`)
            .join('\n\n')
    },
    {
        name: 'search_doctors',
        description: 'Busca médicos pelo nome ou especialidade. Monte a query com o nome do médico e o contexto da pergunta para melhorar a busca semântica.',
        schema: z.object({
            query: z.string().describe('Consulta semântica completa. Inclua o nome do médico e o que se deseja saber. Exemplos: "especialidade da Dra Ana", "Dr Carlos cardiologista", "médicos de ortopedia".'),
        }),
    }
)
