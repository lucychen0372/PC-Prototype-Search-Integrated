import { generateMockSparklineData } from '../sparkline-widget-base'
import type { MockMemoryCluster } from './types'

export const MOCK_MEMORY_CLUSTERS: MockMemoryCluster[] = [
  {
    id: 'cluster-1',
    name: 'Cluster DEF',
    sparklineData: generateMockSparklineData({ min: 30, max: 60 }),
    memoryUsage: generateMockSparklineData({ min: 30, max: 60 }),
    lastValue: 48.58,
  },
  {
    id: 'cluster-2',
    name: 'Cluster GHI',
    sparklineData: generateMockSparklineData({ min: 20, max: 50 }),
    memoryUsage: generateMockSparklineData({ min: 20, max: 50 }),
    lastValue: 35.24,
  },
  {
    id: 'cluster-3',
    name: 'Cluster ABC',
    sparklineData: generateMockSparklineData({ min: 40, max: 70 }),
    memoryUsage: generateMockSparklineData({ min: 40, max: 70 }),
    lastValue: 62.15,
  },
  {
    id: 'cluster-4',
    name: 'Cluster JKL',
    sparklineData: generateMockSparklineData({ min: 25, max: 55 }),
    memoryUsage: generateMockSparklineData({ min: 25, max: 55 }),
    lastValue: 41.33,
  },
  {
    id: 'cluster-5',
    name: 'Cluster MNO',
    sparklineData: generateMockSparklineData({ min: 15, max: 45 }),
    memoryUsage: generateMockSparklineData({ min: 15, max: 45 }),
    lastValue: 28.76,
  },
]
