import React from 'react'

interface Props extends React.ComponentPropsWithoutRef<'div'> {}

const RightMenuContainer: React.FC<Props> = (props) => {
  return (
    <div
      className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      {...props}
    />
  )
}

export default RightMenuContainer
