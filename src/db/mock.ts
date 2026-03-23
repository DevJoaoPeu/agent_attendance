import { db } from './client'

async function mock() {
  // Profissionais
  await db.query(`
    INSERT INTO professionals (name, created_at) VALUES
      ('Dr. Carlos Mendes', NOW()),
      ('Dra. Ana Lima', NOW()),
      ('Dr. Roberto Souza', NOW())
    ON CONFLICT DO NOTHING
  `)

  // Especialidades
  await db.query(`
    INSERT INTO specialties (name, created_at) VALUES
      ('Cardiologia', NOW()),
      ('Ortopedia', NOW()),
      ('Dermatologia', NOW())
    ON CONFLICT DO NOTHING
  `)

  // Pacientes (caso a tabela exista)
  await db.query(`
    INSERT INTO patients (name, created_at) VALUES
      ('João Silva', NOW()),
      ('Maria Oliveira', NOW()),
      ('Pedro Costa', NOW())
    ON CONFLICT DO NOTHING
  `)

  // Agendamentos
  await db.query(`
    INSERT INTO schedule (data, professional_id, specialty_id, patient_id, date_appointment, created_at) VALUES
      (NOW(), 1, 1, 1, '2026-04-01 09:00:00', NOW()),
      (NOW(), 2, 3, 2, '2026-04-02 14:30:00', NOW()),
      (NOW(), 3, 2, 3, '2026-04-03 11:00:00', NOW())
    ON CONFLICT DO NOTHING
  `)

  console.log('Mock data inserido com sucesso.')
  await db.end()
}

mock().catch((err) => {
  console.error('Erro ao inserir mock data:', err)
  process.exit(1)
})
