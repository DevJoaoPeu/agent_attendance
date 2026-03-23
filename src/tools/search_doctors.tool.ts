import { tool } from "@langchain/core/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../embeddings/embeddings";

export const searchDoctorsTool = tool(
    async ({ query }) => {
        const results = await searchFaqByEmbedding(query, 5)
        const doctors = results.filter((r) => r.category === 'doctor')

        if (doctors.length === 0) return 'Nenhum médico encontrado.'

        return doctors
            .map((r) => `Nome: ${r.answer.split(' é ')[0]} | Detalhes: ${r.answer}`)
            .join('\n')
    },
    {
        name: 'search_doctors',
        description: 'Busca médicos disponíveis usando busca semântica. Use a frase ou intenção do usuário como query.',
        schema: z.object({
            query: z.string().describe('Descrição do médico ou especialidade desejada. Exemplo: "médico do coração", "dermatologista", "Dr. Carlos".'),
        }),
    }
)
