import React from 'react'

interface TextAreaProps extends React.ComponentPropsWithoutRef<'textarea'> {}

const TextArea: React.FC<TextAreaProps> = ({ className, ...rest }) => {
  return <textarea className={className ? `input ${className}` : 'input'} {...rest} />
}

export default React.memo(TextArea)
