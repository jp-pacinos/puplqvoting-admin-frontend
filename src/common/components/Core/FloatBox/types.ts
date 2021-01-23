export type XDirectionProps = 'left' | 'middle' | 'right'
export type YDirectionProps = 'top' | 'middle' | 'bottom'

export type DirectionProps = XDirectionProps | YDirectionProps

export type PositionProps = { x: XDirectionProps; y: YDirectionProps }

export interface FloatBoxProps extends React.ComponentPropsWithoutRef<'div'> {
  open: boolean
  duration?: number
  position?: PositionProps
  onClose: () => void
}
