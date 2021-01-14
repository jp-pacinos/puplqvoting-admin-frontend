import React from 'react'

interface Props {
  status: 'open' | 'completed' | 'ongoing' | 'cancelled' | ''
}

const Status: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'open': {
      return (
        <p className="bg-blue-500 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
          open
        </p>
      )
    }

    case 'ongoing': {
      return (
        <p className="bg-yellow-500 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
          started
        </p>
      )
    }

    case 'completed': {
      return (
        <p className="bg-green-500 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
          completed
        </p>
      )
    }

    case 'cancelled': {
      return (
        <p className="bg-gray-400 text-white text-xs font-semibold rounded-full px-3 leading-loose mr-1">
          cancelled
        </p>
      )
    }
  }

  return null
}

export default Status
