interface StatusIndicatorProps {
  level: number
}

export function StatusIndicator({ level }: StatusIndicatorProps) {
  const getColor = () => {
    if (level < 30) return "text-green-600"
    if (level < 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getLabel = () => {
    if (level < 30) return "Low"
    if (level < 70) return "Moderate"
    return "High"
  }

  return (
    <span className={`text-sm font-medium ${getColor()}`}>
      {getLabel()} ({level}%)
    </span>
  )
}
