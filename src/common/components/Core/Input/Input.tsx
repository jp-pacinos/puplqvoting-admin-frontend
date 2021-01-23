import React, { forwardRef } from 'react'

interface Props extends React.ComponentPropsWithRef<'input'> {}

const Input: React.FC<Props> = forwardRef(({ className, ...rest }, ref) => {
  return <input ref={ref} className={className ? `input ${className}` : 'input'} {...rest} />
})

export default Input
