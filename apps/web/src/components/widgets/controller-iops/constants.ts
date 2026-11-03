import { generateMockSparklineData } from '../sparkline-widget-base'
import type { MockIopsCluster } from './types'

export const MOCK_IOPS_CLUSTERS: MockIopsCluster[] = [
  {
    id: 'cluster-1',
    name: 'Cluster DEF',
    sparklineData: generateMockSparklineData({ min: 200, max: 300 }),
    iops: generateMockSparklineData({ min: 200, max: 300 }),
    lastValue: 247,
  },
  {
    id: 'cluster-2',
    name: 'Cluster GHI',
    sparklineData: generateMockSparklineData({ min: 150, max: 250 }),
    iops: generateMockSparklineData({ min: 150, max: 250 }),
    lastValue: 189,
  },
  {
    id: 'cluster-3',
    name: 'Cluster ABC',
    sparklineData: generateMockSparklineData({ min: 100, max: 200 }),
    iops: generateMockSparklineData({ min: 100, max: 200 }),
    lastValue: 156,
  },
  {
    id: 'cluster-4',
    name: 'Cluster JKL',
    sparklineData: generateMockSparklineData({ min: 180, max: 280 }),
    iops: generateMockSparklineData({ min: 180, max: 280 }),
    lastValue: 223,
  },
  {
    id: 'cluster-5',
    name: 'Cluster MNO',
    sparklineData: generateMockSparklineData({ min: 120, max: 220 }),
    iops: generateMockSparklineData({ min: 120, max: 220 }),
    lastValue: 174,
  },
]
