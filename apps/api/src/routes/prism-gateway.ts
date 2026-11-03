import { Hono } from 'hono'

const prismGatewayRoutes = new Hono()

interface UserDataRecord {
  username: string
  type: string
  key: string
  value: string
  updatedTimeInUsecs: number
  identifier?: string
  updatedByConfig: boolean
}

const userDataRecords = new Map<string, UserDataRecord>()

const createUserDataRecord = (
  record: Pick<UserDataRecord, 'key' | 'type' | 'value'>,
): UserDataRecord => ({
  username: 'admin',
  ...record,
  updatedTimeInUsecs: Date.now() * 1000,
  identifier: undefined,
  updatedByConfig: false,
})

userDataRecords.set(
  'STORAGE_CONTAINER_NEW_FEAT_INTRO',
  createUserDataRecord({
    key: 'STORAGE_CONTAINER_NEW_FEAT_INTRO',
    type: 'WELCOME_BANNER',
    value: 'true',
  }),
)
userDataRecords.set(
  'VM_NEW_FEAT_INTRO',
  createUserDataRecord({
    key: 'VM_NEW_FEAT_INTRO',
    type: 'WELCOME_BANNER',
    value: 'ccvs_phase_1',
  }),
)

prismGatewayRoutes.get('/application/user_data', (c) => {
  const type = c.req.query('type')
  const records = [...userDataRecords.values()]

  return c.json(
    type ? records.filter((record) => record.type === type) : records,
  )
})

prismGatewayRoutes.get('/application/user_data/:key', (c) => {
  const record = userDataRecords.get(c.req.param('key'))

  return record ? c.json(record) : c.json({}, 404)
})

prismGatewayRoutes.post('/application/user_data', async (c) => {
  const body = await c.req.json<{ type: string; key: string; value: string }>()
  const record = createUserDataRecord(body)

  userDataRecords.set(body.key, record)

  return c.json(record)
})

prismGatewayRoutes.put('/application/user_data', async (c) => {
  const body = await c.req.json<{ type: string; key: string; value: string }>()
  const record = createUserDataRecord(body)

  userDataRecords.set(body.key, record)

  return c.json(record)
})

prismGatewayRoutes.delete('/application/user_data/:key', (c) => {
  userDataRecords.delete(c.req.param('key'))

  return c.json({})
})

prismGatewayRoutes.get('/users/session_info', (c) => {
  return c.json({
    ff: [2, 11, 15, 14, 27, 4, 6, 37, 26, 7, 28, 1, 18, 29, 35, 9, 19, 12, 31],
    clusterId: '3340148275696622722',
    clusterUuid: '747bea8e-887d-4a6e-ae5a-9728ee07dc82',
    clusterName: 'PC_10.103.176.24',
    applianceVersion: {
      buildType: 'opt',
      version: '<HARDCODED-PRODUCT-VERSION>',
      commitIdShort: 'ee8e9f',
      isLTS: undefined,
    },
    multicluster: true,
    ceCluster: false,
    clusterRbacEnabled: true,
    userDTO: {
      profile: {
        username: 'admin',
        firstName: 'admin',
        locale: 'en-US',
        region: 'en-US',
      },
      roles: [
        'ROLE_CLUSTER_ADMIN',
        'ROLE_MULTICLUSTER_ADMIN',
        'ROLE_USER_ADMIN',
        'ROLE_CLUSTER_VIEWER',
      ],
      enabled: true,
    },
    userSettings: {
      UI_CONFIG: [...userDataRecords.values()].filter(
        (record) => record.type === 'UI_CONFIG',
      ),
    },
    local: true,
  })
})

prismGatewayRoutes.get('/portal-config', (c) => {
  return c.json({
    portalApiKey: undefined,
    destPubCert: undefined,
    destHost: undefined,
    destPort: undefined,
    status: 'OFF',
    message: undefined,
    authToken: undefined,
    portalEndpoint: undefined,
    keyId: undefined,
  })
})

prismGatewayRoutes.get('/progress_monitors', (c) => {
  return c.json({
    metadata: {
      grandTotalEntities: 0,
      totalEntities: 0,
      filterCriteria: c.req.query('filter_criteria') ?? '',
      startIndex: Number(c.req.query('start_index') ?? 0),
    },
    entities: [],
  })
})

export default prismGatewayRoutes
