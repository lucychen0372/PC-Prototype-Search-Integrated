import type { SparklineClusterData } from '../sparkline-widget-base'

// Mock cluster memory usage data
export interface MockMemoryCluster extends SparklineClusterData {
  memoryUsage: number[]
}
