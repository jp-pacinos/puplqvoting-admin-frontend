import React from 'react'
import { useSelector } from 'react-redux'
import { groupBy } from 'lodash'

import { Fade } from 'common/components/Transitions'
import { selectSessionOptions } from 'features/app/appSlice'
import { selectAllParties } from 'features/parties/index/slice'
import PartyElectionGroup from './../PartyElectionGroup'

import { Pagination } from './components'

interface Props {
  usePage: () => [number, React.Dispatch<React.SetStateAction<number>>]
}

const PartyLists: React.FC<Props> = ({ usePage }) => {
  const elections = useSelector(selectSessionOptions)
  const parties = useSelector(selectAllParties)

  const partiesByElection = groupBy(parties, 'session_id')

  // parties data might be fetched but
  // the election data is not ready
  if (elections.length === 0) {
    return (
      <div className="text-center">
        <p className="my-10 text-gray-500 font-semibold">
          {parties.length === 0 ? 'No results found.' : 'Please wait...'}
        </p>
      </div>
    )
  }

  if (parties.length !== 0) {
    /**
     * render the parties by election order,
     * using data (sessions) from app slice
     */
    return (
      <>
        {elections.map((election) => {
          return (
            <Fade
              key={election.value}
              renderComponent={(nodeRef) => (
                <PartyElectionGroup
                  ref={nodeRef}
                  name={election.text}
                  parties={partiesByElection[election.value]}
                />
              )}
            />
          )
        })}

        <Pagination usePage={usePage} />
      </>
    )
  }

  return (
    <div className="text-center">
      <p className="my-10 text-gray-500 font-semibold">No records found.</p>
    </div>
  )
}

export default PartyLists
