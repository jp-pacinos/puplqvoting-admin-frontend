import React, { useMemo } from 'react'

const baseRootClass = 'input'

interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {}

const TextArea: React.FC<TextAreaProps> = ({ className = '', ...rest }) => {
  let rootClass = useMemo(() => (className ? `${baseRootClass} ${className}` : baseRootClass), [
    className,
  ])

  return <textarea className={rootClass} {...rest} />
}

export default TextArea
