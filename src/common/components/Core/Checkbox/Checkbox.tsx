import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<'input'> {}

const Checkbox: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <input
      type="checkbox"
      className={className ? `form-checkbox ${className}` : 'form-checkbox'}
      {...rest}
    />
  )
}

export default Checkbox
