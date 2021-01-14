import React from 'react'
import { Session } from 'api/types/Models'

interface Props {
  type: Session.Fields['verification_type']
}

const StatusVotingConfirmation: React.FC<Props> = ({ type }) => {
  return (
    <p className="bg-gray-200 text-gray-700 text-xs font-semibold rounded-full px-3 leading-loose mr-1">
      {type === 'code' && 'code verification'}
      {type === 'email' && 'email verification'}
      {type === 'open' && 'no verification'}
    </p>
  )
}

export default StatusVotingConfirmation
