export type sizes = 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl'

export type positions = 'top' | 'center'

export interface ModalProps {
  size?: sizes
  position?: positions
  name: string
  children?: React.ReactNode
  className?: string
  open: boolean
  onClose: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>) => void
}
