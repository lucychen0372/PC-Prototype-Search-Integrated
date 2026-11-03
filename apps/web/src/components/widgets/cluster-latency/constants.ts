import { generateMockSparklineData } from '../sparkline-widget-base'
import type { MockLatencyCluster } from './types'

export const MOCK_LATENCY_CLUSTERS: MockLatencyCluster[] = [
  {
    id: 'cluster-1',
    name: 'Cluster DEF',
    sparklineData: generateMockSparklineData({ min: 0.1, max: 2 }),
    latency: generateMockSparklineData({ min: 0.1, max: 2 }),
    lastValue: 0.78,
  },
  {
    id: 'cluster-2',
    name: 'Cluster GHI',
    sparklineData: generateMockSparklineData({ min: 0.1, max: 2 }),
    latency: generateMockSparklineData({ min: 0.1, max: 2 }),
    lastValue: 0.45,
  },
  {
    id: 'cluster-3',
    name: 'Cluster ABC',
    sparklineData: generateMockSparklineData({ min: 0.1, max: 2 }),
    latency: generateMockSparklineData({ min: 0.1, max: 2 }),
    lastValue: 1.23,
  },
  {
    id: 'cluster-4',
    name: 'Cluster JKL',
    sparklineData: generateMockSparklineData({ min: 0.1, max: 2 }),
    latency: generateMockSparklineData({ min: 0.1, max: 2 }),
    lastValue: 0.92,
  },
  {
    id: 'cluster-5',
    name: 'Cluster MNO',
    sparklineData: generateMockSparklineData({ min: 0.1, max: 2 }),
    latency: generateMockSparklineData({ min: 0.1, max: 2 }),
    lastValue: 0.56,
  },
]
