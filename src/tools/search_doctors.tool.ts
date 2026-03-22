import { tool } from "@langchain/core/tools";
import z from "zod";
import { searchFaqByEmbedding } from "../embeddings/embeddings";

interface SearchDoctorsToolInterface {
    doctorName: string
    specialty?: string
}

export const searchDoctorsTool = tool(
    async ({ doctorName, specialty }: SearchDoctorsToolInterface) => {
        const query = [doctorName, specialty].filter(Boolean).join(' ')
        const rows = await searchFaqByEmbedding(query)

        if (rows.length === 0) return 'Nenhum médico encontrado.'

        return rows
            .map((r) => `[${r.category}] P: ${r.question}\nR: ${r.answer}`)
            .join('\n\n')
    },
    {
        name: 'search_doctors',
        description: 'Usada para listar médicos com ou sem a especialidade.',
        schema: z.object({
            doctorName: z.string().describe('Nome do médico'),
            specialty: z.string().optional().describe('Especialidade do médico'),
        }),
    }
)
