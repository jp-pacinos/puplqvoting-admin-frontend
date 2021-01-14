import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Body: React.FC<Props> = ({ children }) => {
  return <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
}

export default Body
