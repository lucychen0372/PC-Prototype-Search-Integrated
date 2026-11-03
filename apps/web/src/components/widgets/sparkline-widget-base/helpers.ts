/**
 * Generate mock sparkline data (array of numeric values) with smooth transitions
 * @param options Configuration options for data generation
 * @param options.count Number of data points to generate (default: 20)
 * @param options.min Minimum value (default: 0)
 * @param options.max Maximum value (default: 100)
 * @returns Array of random numeric values within the specified range with gradual changes
 */
export const generateMockSparklineData = (options?: {
  count?: number
  min?: number
  max?: number
}): number[] => {
  const { count = 20, min = 0, max = 100 } = options || {}
  const data: number[] = []
  const range = max - min
  const midPoint = min + range / 2

  // Start at a random point near the middle
  let currentValue = midPoint + (Math.random() - 0.5) * range * 0.3

  for (let i = 0; i < count; i++) {
    // Add some random walk with momentum
    const maxChange = range * 0.1 // Limit change to 10% of range per step
    const change = (Math.random() - 0.5) * maxChange

    // Apply change with slight smoothing
    currentValue += change

    // Keep within bounds with soft boundaries
    if (currentValue < min) {
      currentValue = min + Math.random() * range * 0.1
    } else if (currentValue > max) {
      currentValue = max - Math.random() * range * 0.1
    }

    data.push(currentValue)
  }

  return data
}
