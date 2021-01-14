import React, { useMemo, forwardRef } from 'react'

const baseRootClass = 'input'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
}

const Input: React.FC<InputProps> = forwardRef(({ className = '', ...rest }, ref) => {
  let rootClass = useMemo(() => (className ? `${baseRootClass} ${className}` : baseRootClass), [
    className,
  ])

  return <input ref={ref} className={rootClass} {...rest} />
})

export default Input
