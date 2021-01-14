export type DirectionProps = 'left' | 'right' | 'middle' | 'top' | 'bottom'

export type PositionProps = { x: DirectionProps; y: DirectionProps }

export interface FloatBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  open: boolean
  duration?: number
  position?: PositionProps
  onClose: () => void
}
