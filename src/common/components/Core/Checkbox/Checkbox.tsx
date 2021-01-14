import React, { useMemo } from 'react'

interface CheckboxProps extends React.ComponentPropsWithoutRef<'input'> {}

const Checkbox: React.FC<CheckboxProps> = ({ className, ...rest }) => {
  let rootClass = useMemo(() => {
    let base = 'form-checkbox'
    return `${className ? `${base} ${className}` : base}`
  }, [className])

  return <input type="checkbox" className={rootClass} {...rest} />
}

export default Checkbox
