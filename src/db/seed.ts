import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { embeddingsModel } from '../embeddings/embedding.model'
import { db } from './client'

const MOCK_DATA_DIR = path.resolve('mock_data')

interface FaqRow {
  id: string
  question: string
  answer: string
  category: string
}

async function readJsonl(filePath: string): Promise<FaqRow[]> {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  })
  const rows: FaqRow[] = []
  for await (const line of rl) {
    if (line.trim()) rows.push(JSON.parse(line) as FaqRow)
  }
  return rows
}

async function seed() {
  if (!fs.existsSync(MOCK_DATA_DIR)) {
    console.error(`Diretório não encontrado: ${MOCK_DATA_DIR}`)
    process.exit(1)
  }

  const files = fs.readdirSync(MOCK_DATA_DIR).filter((f) => f.endsWith('.jsonl'))

  if (files.length === 0) {
    console.error(`Nenhum arquivo .jsonl encontrado em ${MOCK_DATA_DIR}`)
    process.exit(1)
  }

  for (const file of files) {
    const filePath = path.join(MOCK_DATA_DIR, file)
    console.log(`\nProcessando: ${file}`)

    const rows = await readJsonl(filePath)
    console.log(`  ${rows.length} registros encontrados. Gerando embeddings...`)

    for (const row of rows) {
      const text = `${row.question} ${row.answer}`
      const vector = await embeddingsModel.embedQuery(text)

      await db.query(
        `INSERT INTO faq (id, question, answer, category)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE
           SET question = EXCLUDED.question,
               answer   = EXCLUDED.answer,
               category = EXCLUDED.category`,
        [row.id, row.question, row.answer, row.category]
      )

      await db.query(
        `INSERT INTO faq_embeddings (faq_id, embedding)
         VALUES ($1, $2::vector)
         ON CONFLICT DO NOTHING`,
        [row.id, JSON.stringify(vector)]
      )

      console.log(`  inserido: [${row.category}] ${row.question.slice(0, 60)}`)
    }
  }

  console.log('\nSeed concluído.')
  await db.end()
}

seed().catch((err) => {
  console.error('Erro no seed:', err)
  process.exit(1)
})
