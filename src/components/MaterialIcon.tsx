interface MaterialIconProps {
  name: string
  size?: number
  color?: string
}

export default function MaterialIcon({ name, size = 20, color = '#00488d' }: MaterialIconProps) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: size, color }}
    >
      {name}
    </span>
  )
}
