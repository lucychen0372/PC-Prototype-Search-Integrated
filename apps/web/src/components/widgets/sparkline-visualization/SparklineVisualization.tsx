// Simple sparkline visualization component
export const SparklineVisualization = ({
  data,
  color,
}: {
  data: number[]
  color: string
}) => {
  if (data.length === 0) {
    return <></>
  }

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  // Create SVG path for sparkline
  const width = 80
  const height = 20
  const padding = 2

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - padding * 2) + padding
    const y =
      height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const pathData = `M ${points.join(' L ')}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="sparkline-svg"
      aria-hidden="true"
    >
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
