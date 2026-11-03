import { Hono } from 'hono'

const healthRoutes = new Hono()

healthRoutes.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

healthRoutes.get('/hello', (c) => {
  return c.json({ message: 'Hello from Hono!' })
})

export default healthRoutes
