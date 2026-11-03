// Base interface for cluster data with sparkline
export interface SparklineClusterData {
  id: string
  name: string
  sparklineData: number[]
  lastValue: number
  hasExpiredLicense?: boolean
}
