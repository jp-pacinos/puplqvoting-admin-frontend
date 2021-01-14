import React from 'react'
import { useSelector } from 'react-redux'
import groupBy from 'lodash/groupBy'

import { selectParties, selectSummary } from 'features/elections/_id'
import { PartyTable } from './components'

interface Props {
  //
}

const StudentVotesSummary: React.FC<Props> = () => {
  const parties = useSelector(selectParties)
  const studentVotes = useSelector(selectSummary)

  if (parties && parties.length === 0) return null

  let partyGroup = groupBy(studentVotes, 'party_id')

  return (
    <div className="card">
      <h4 className="text-blue-600 font-medium text-center my-3">
        Summary of Vote Results <span className="text-sm text-gray-500">as of now</span>
      </h4>

      <PartiesContainer>
        {parties.map((party) => (
          <PartyContainer key={party.id}>
            <PartyTitle>{party.name}</PartyTitle>
            <PartyTable data={partyGroup[party.id]} />
          </PartyContainer>
        ))}
      </PartiesContainer>
    </div>
  )
}

export default StudentVotesSummary

//

const PartiesContainer: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="flex flex-wrap -mx-2 mb-3" {...props} />
}

const PartyTitle: React.FC<React.ComponentPropsWithoutRef<'h5'>> = ({ children, ...rest }) => {
  return (
    <h5 className="w-full text-center text-gray-700 font-semibold my-3" {...rest}>
      {children}
    </h5>
  )
}

const PartyContainer: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="w-full md:w-1/2 px-2 mb-3" {...props} />
}
