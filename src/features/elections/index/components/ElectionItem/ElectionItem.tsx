import React from 'react'
import { useHistory } from 'react-router-dom'
import { AiOutlineDashboard, AiOutlineSetting } from 'react-icons/ai'
import { MdPeopleOutline } from 'react-icons/md'
import { FiKey } from 'react-icons/fi'

import { Paragraph } from 'common/components'
import { IconButton } from 'common/components/Core'
import { Fade, FadeGrow, SlideRight } from 'common/components/Transitions'
import { SelectElection, StartRegistration, StartElection } from 'features/elections/components'
import { Election } from 'features/elections/index/slice/types'

import { Status, StatusRegistration, StatusVotingConfirmation } from './components'
import getStatus from './getStatus'

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  election: Election
}

const ElectionItem: React.FC<Props> = ({ election, ...rest }) => {
  const history = useHistory()

  const openElection = () => {
    history.push(`/elections/${election.id}`, { data: election })
  }

  const openParties = () => {
    history.push(`/parties?election=${election.id}`)
  }

  const openElectionKeys = () => {
    history.push(`/elections/${election.id}/keys`, { election })
  }

  const openElectionSettings = () => {
    history.push(`/elections/${election.id}/settings`, { election })
  }

  const status = getStatus(election)
  const isSelected = Boolean(election.active)
  const isStarted = election.started_at !== null
  const isFinished = status === 'completed' || status === 'cancelled'

  const haveRegistration = Boolean(election.registration)
  const isRegistrationStarted = haveRegistration && election.registration_at !== null

  return (
    <div className="card p-5 hover:shadow  transition-shadow ease-in-out duration-200" {...rest}>
      <div className="mb-4">
        <div className="flex flex-wrap items-baseline mb-2">
          <h2 className="text-gray-700 font-bold text-lg leading-relaxed mr-3">{election.name}</h2>

          <Fade delay={isSelected ? 0 : 100} className="flex-grow flex flex-wrap my-1 md:my-0">
            <Status status={status} />
            {haveRegistration && <StatusRegistration isOngoing={isRegistrationStarted} />}
            <StatusVotingConfirmation type={election.verification_type} />
          </Fade>
        </div>

        <Paragraph text={election.description} truncate={350} />
      </div>

      <SlideRight className="flex items-center">
        <IconButton onClick={openElection} className="btn btn-blue mr-2" title="Dashboard">
          <AiOutlineDashboard />
        </IconButton>

        <IconButton onClick={openParties} className="btn btn-gray mr-2" title="Parties">
          <MdPeopleOutline />
        </IconButton>

        {election.verification_type === 'code' && (
          <IconButton onClick={openElectionKeys} className="btn btn-gray mr-2" title="Student Keys">
            <FiKey />
          </IconButton>
        )}

        <IconButton
          onClick={openElectionSettings}
          className="btn btn-gray mr-2 md:mr-4"
          title="Settings"
        >
          <AiOutlineSetting />
        </IconButton>

        {!isFinished && (
          <SelectElection id={election.id}>
            {({ makeSelected, loading }) => (
              <button
                onClick={() => makeSelected(!isSelected)}
                className="btn btn-gray mr-2 w-24 px-0"
                disabled={loading}
              >
                {isSelected ? 'Unselect' : 'Select'}
              </button>
            )}
          </SelectElection>
        )}

        <FadeGrow delay={75} in={!isFinished && isSelected && haveRegistration}>
          <StartRegistration id={election.id}>
            {({ setRegistration, loading }) => (
              <button
                onClick={() => setRegistration(!isRegistrationStarted)}
                className={`btn ${isRegistrationStarted ? 'btn-red' : 'btn-gray'} mr-2`}
                disabled={loading}
              >
                {isRegistrationStarted ? 'Stop Registration' : 'Start Registration'}
              </button>
            )}
          </StartRegistration>
        </FadeGrow>

        <FadeGrow delay={175} in={!isFinished && isSelected}>
          <StartElection id={election.id}>
            {({ makeStarted, loading }) => (
              <button
                onClick={() => makeStarted(!isStarted)}
                className={`btn ${isStarted ? 'btn-red' : 'btn-gray'} mr-2`}
                disabled={loading}
              >
                {isStarted ? 'Stop Election' : 'Start Election'}
              </button>
            )}
          </StartElection>
        </FadeGrow>
      </SlideRight>
    </div>
  )
}

export default ElectionItem
