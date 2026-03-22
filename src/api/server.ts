import Fastify from 'fastify'
import { graph } from '../graph/attendance.graph'

const app = Fastify()

interface BodyMessagesInterface {
  message: string
  id: string
}

app.post('/message', async (request, reply) => {
  const { message, id } = request.body as BodyMessagesInterface

  const data = await graph.invoke({ message, route: '', response: '' })

  return reply.send({ id, response: data.response })
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})
