import Fastify from 'fastify'

const app = Fastify()

interface BodyMessagesInterface {
  message: string
  id: string
}

app.post('/message', async (request, reply) => {
  const { message, id } = request.body as BodyMessagesInterface

  return reply.send({ id, message })
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})
