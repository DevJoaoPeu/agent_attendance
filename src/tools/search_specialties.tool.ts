import { tool } from "@langchain/core/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../embeddings/embeddings";

export const searchSpecialtiesTool = tool(
    async ({ query }) => {
        const results = await searchFaqByEmbedding(query, 5)
        const specialties = results.filter((r) => r.category === 'specialty')

        if (specialties.length === 0) return 'Nenhuma especialidade encontrada.'

        return specialties
            .map((r) => `Especialidade: ${r.question.replace('Especialidade: ', '')} | ${r.answer}`)
            .join('\n')
    },
    {
        name: 'search_specialties',
        description: 'Busca especialidades médicas usando busca semântica. Use a frase ou intenção do usuário como query.',
        schema: z.object({
            query: z.string().describe('Descrição da especialidade desejada. Exemplo: "problema no joelho", "pele", "coração".'),
        }),
    }
)
