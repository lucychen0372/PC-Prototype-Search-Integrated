import type { SparklineClusterData } from '../sparkline-widget-base'

// Mock cluster CPU usage data
export interface MockCpuCluster extends SparklineClusterData {
  cpuUsage: number[]
}
