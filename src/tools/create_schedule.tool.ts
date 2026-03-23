import { tool } from "@langchain/core/tools";
import z from "zod";
import { db } from "../db/client";

interface CreateScheduleToolInterface {
    professional_id: number
    specialty_id: number
    patient_id: number
    date_appointment: string
}

export const createScheduleTool = tool(
    async ({ professional_id, specialty_id, patient_id, date_appointment }: CreateScheduleToolInterface) => {
        const now = new Date()

        const result = await db.query(
            `INSERT INTO schedule (data, professional_id, specialty_id, patient_id, date_appointment, created_at)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [now, professional_id, specialty_id, patient_id, new Date(date_appointment), now]
        )

        const id = result.rows[0]?.id
        return `Agendamento criado com sucesso. ID: ${id}. Data: ${date_appointment}.`
    },
    {
        name: 'create_schedule',
        description: 'Cria um agendamento médico para um paciente com um profissional em uma especialidade na data informada.',
        schema: z.object({
            professional_id: z.number().describe('ID do profissional (médico) que realizará o atendimento.'),
            specialty_id: z.number().describe('ID da especialidade médica do atendimento.'),
            patient_id: z.number().describe('ID do paciente que será atendido.'),
            date_appointment: z.string().describe('Data e hora do agendamento no formato ISO 8601. Exemplo: "2026-04-15T10:30:00".'),
        }),
    }
)
