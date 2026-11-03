import { generateMockSparklineData } from '../sparkline-widget-base'
import type { MockCpuCluster } from './types'

export const MOCK_CPU_CLUSTERS: MockCpuCluster[] = [
  {
    id: 'cluster-1',
    name: 'Cluster DEF',
    sparklineData: generateMockSparklineData({ min: 25, max: 45 }),
    cpuUsage: generateMockSparklineData({ min: 25, max: 45 }),
    lastValue: 35.92,
  },
  {
    id: 'cluster-2',
    name: 'Cluster GHI',
    sparklineData: generateMockSparklineData({ min: 15, max: 35 }),
    cpuUsage: generateMockSparklineData({ min: 15, max: 35 }),
    lastValue: 24.67,
  },
  {
    id: 'cluster-3',
    name: 'Cluster ABC',
    sparklineData: generateMockSparklineData({ min: 30, max: 50 }),
    cpuUsage: generateMockSparklineData({ min: 30, max: 50 }),
    lastValue: 42.18,
  },
  {
    id: 'cluster-4',
    name: 'Cluster JKL',
    sparklineData: generateMockSparklineData({ min: 20, max: 40 }),
    cpuUsage: generateMockSparklineData({ min: 20, max: 40 }),
    lastValue: 31.45,
  },
  {
    id: 'cluster-5',
    name: 'Cluster MNO',
    sparklineData: generateMockSparklineData({ min: 10, max: 30 }),
    cpuUsage: generateMockSparklineData({ min: 10, max: 30 }),
    lastValue: 18.92,
  },
]
