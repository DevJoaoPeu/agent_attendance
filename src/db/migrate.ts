import { db } from './client'

async function migrate() {
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS vector;

    CREATE TABLE IF NOT EXISTS faq (
      id VARCHAR(100) PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(100) NOT NULL
    );

    DROP TABLE IF EXISTS faq_embeddings;

    CREATE TABLE faq_embeddings (
      id SERIAL PRIMARY KEY,
      faq_id VARCHAR(100) NOT NULL REFERENCES faq(id) ON DELETE CASCADE,
      embedding vector(3072) NOT NULL
    );

  `)

  console.log('Migrations executadas com sucesso.')
  await db.end()
}

migrate().catch((err) => {
  console.error('Erro na migração:', err)
  process.exit(1)
})
