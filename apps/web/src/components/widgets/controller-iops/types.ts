import type { SparklineClusterData } from '../sparkline-widget-base'

// Mock controller IOPS data
export interface MockIopsCluster extends SparklineClusterData {
  iops: number[]
}
