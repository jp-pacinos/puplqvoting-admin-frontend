export interface Item {
  text: string | number
  value: string | number
}

export interface SelectProps extends React.ComponentPropsWithoutRef<'select'> {
  items: Item[]
  placeholder?: string
}
