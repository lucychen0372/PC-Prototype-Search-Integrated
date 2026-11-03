import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

import { registerRoutes } from './routes'

export const createApp = () => {
  const app = new Hono()

  app.use('*', logger())
  app.use(
    '*',
    cors({
      origin: 'http://localhost:3000',
    }),
  )

  registerRoutes(app)

  return app
}
