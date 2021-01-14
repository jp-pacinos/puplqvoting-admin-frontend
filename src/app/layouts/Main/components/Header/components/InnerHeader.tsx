import React from 'react'

interface Props {
  children: React.ReactNode
}

const InnerHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">{children}</div>
    </div>
  )
}

export default InnerHeader
