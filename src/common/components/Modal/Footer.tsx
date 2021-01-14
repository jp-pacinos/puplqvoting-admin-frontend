import React from 'react'

interface Props {
  children: React.ReactNode
}

const Footer: React.FC<Props> = ({ children }) => {
  return <div className="bg-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">{children}</div>
}

export default Footer
