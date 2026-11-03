import type { Hono } from 'hono'

import groupsRoutes from '../features/groups/routes'
import healthRoutes from './health'
import prismGatewayRoutes from './prism-gateway'

export const registerRoutes = (app: Hono) => {
  app.route('/api', healthRoutes)
  app.route('/api/nutanix/v3/groups', groupsRoutes)
  app.route('/PrismGateway/services/rest/v1', prismGatewayRoutes)
}
