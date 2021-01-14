import React from 'react'

interface Props {
  isOngoing: boolean
}

const StatusRegistration: React.FC<Props> = ({ isOngoing }) => {
  if (isOngoing) {
    return (
      <p className="bg-yellow-500 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
        registration started
      </p>
    )
  }

  return (
    <p className="bg-blue-500 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
      registration
    </p>
  )
}

export default StatusRegistration
