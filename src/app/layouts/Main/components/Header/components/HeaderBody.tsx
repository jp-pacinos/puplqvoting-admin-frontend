import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

const HeaderBody: React.FC<Props> = (props) => {
  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16" {...props} />
    </div>
  )
}

export default HeaderBody
