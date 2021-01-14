import { PositionProps } from 'common/components/Core/FloatBox'

export interface SnackbarProps extends React.ComponentPropsWithoutRef<'div'> {
  text: string
  open: boolean
  duration?: number
  position?: PositionProps
  onClose: () => void
}
