// Simple progress bar visualization component
export const ProgressBarVisualization = ({
  value,
  color,
}: {
  value: number // 0-100 percentage
  color: string
}) => {
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <div
      className="progress-bar-container"
      style={{
        width: '80px',
        height: '8px',
        backgroundColor: 'var(--color-border-default)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div
        className="progress-bar-fill"
        style={{
          width: `${clampedValue}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '4px',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
