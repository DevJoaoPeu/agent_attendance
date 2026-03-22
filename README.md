# Agent Attendance

Sistema de atendimento para clínica médica baseado em agentes de IA. Recebe mensagens de pacientes e as direciona automaticamente para o agente especialista correto.

## Arquitetura

```
Mensagem do paciente
       ↓
   [Triage] ── decide o destino
       ↓
  ┌────┬────┬──────────────────┐
  ↓    ↓    ↓                  ↓
[Financial] [Schedule] [Doctors/Specialties] [General]
```

- **Triage** — lê a mensagem e decide qual agente deve responder
- **Financial** — dúvidas sobre valores de consultas e exames
- **Schedule** — agendamento de consultas e exames
- **Doctors/Specialties** — busca de médicos e especialidades
- **General** — informações gerais da clínica (endereço, horários etc.)

Stack: Fastify · LangGraph · LangChain

## Como rodar

**1. Instale as dependências**
```bash
npm install
```

**2. Configure o `.env`**
```bash
cp .env.example .env
```

Preencha a API key do provedor desejado:

| `LLM_PROVIDER` | API key necessária |
|---|---|
| `gemini` (padrão) | `GEMINI_API_KEY` |
| `deepseek` | `DEEPSEEK_API_KEY` |
| `anthropic` | `ANTHROPIC_API_KEY` |
| `openai` | `OPENAI_API_KEY` |

**3. Inicie o servidor**
```bash
npm run dev
```

## API

```http
POST http://localhost:3000/message
Content-Type: application/json

{
  "id": "123",
  "message": "Quero agendar uma consulta"
}
```
