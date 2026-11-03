import type { MockCluster } from './types'

export const MOCK_CLUSTERS: MockCluster[] = [
  { id: 'cluster-1', name: 'Cluster DEF', hasExpiredLicense: true },
  { id: 'cluster-2', name: 'Cluster GHI', hasExpiredLicense: false },
  { id: 'cluster-3', name: 'Cluster ABC', hasExpiredLicense: true },
  { id: 'cluster-4', name: 'Cluster JKL', hasExpiredLicense: false },
  { id: 'cluster-5', name: 'Cluster MNO', hasExpiredLicense: false },
]
