import type { SparklineClusterData } from '../sparkline-widget-base'

// Mock cluster latency data
export interface MockLatencyCluster extends SparklineClusterData {
  latency: number[]
}
