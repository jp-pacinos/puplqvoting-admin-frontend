import React, { forwardRef } from 'react'

interface Props extends React.ComponentPropsWithRef<'button'> {
  //
}

const IconButton: React.FC<Props> = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <button ref={ref} className={`icon-button${className ? ` ${className}` : ''}`} {...rest}>
      {children}
    </button>
  )
})

export default IconButton
