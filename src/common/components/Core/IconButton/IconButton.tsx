import React, { forwardRef } from 'react'

interface Props extends React.ComponentPropsWithRef<'button'> {}

const IconButton: React.FC<Props> = forwardRef(({ className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      className={className ? `icon-button ${className}` : 'icon-button'}
      {...rest}
    />
  )
})

export default React.memo(IconButton)
