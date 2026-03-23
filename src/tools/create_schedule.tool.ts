import { tool } from "@langchain/core/tools";
import z from "zod";
import { db } from "../db/client";

export const createScheduleTool = tool(
    async ({ professional_name, specialty_name, patient_name, date_appointment }) => {
        const now = new Date()

        const result = await db.query(
            `INSERT INTO schedule (data, professional_name, specialty_name, patient_name, date_appointment, created_at)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [now, professional_name, specialty_name, patient_name, new Date(date_appointment), now]
        )

        const id = result.rows[0]?.id
        return `Agendamento criado com sucesso. ID: ${id}. Médico: ${professional_name}. Especialidade: ${specialty_name}. Data: ${date_appointment}.`
    },
    {
        name: 'create_schedule',
        description: 'Cria um agendamento médico para um paciente com um profissional em uma especialidade na data informada.',
        schema: z.object({
            professional_name: z.string().describe('Nome completo do profissional (médico). Exemplo: "Dr. Carlos Mendes".'),
            specialty_name: z.string().describe('Nome da especialidade médica. Exemplo: "Cardiologia".'),
            patient_id: z.number().describe('ID do paciente que será atendido.'),
            date_appointment: z.string().describe('Data e hora do agendamento no formato ISO 8601. Exemplo: "2026-04-15T10:30:00".'),
        }),
    }
)
