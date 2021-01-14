import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { AiOutlineSetting } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'

import { Fade } from 'common/components/Transitions'
import { selectElection, selectElectionResultsLink } from 'features/elections/_id'
import { Paragraph } from 'common/components'
import {
  Status,
  StatusRegistration,
  StatusVotingConfirmation,
} from 'features/elections/index/components/ElectionItem/components'
import getStatus from 'features/elections/index/components/ElectionItem/getStatus'

interface Props {}

const ElectionHeader: React.FC<Props> = () => {
  const params = useParams<{ id: string }>()
  const history = useHistory()

  const election = useSelector(selectElection)

  const onClickSettings = () => {
    history.push(`/elections/${params.id}/settings`, { election })
  }

  if (!election) return null

  const status = getStatus(election)
  const haveRegistration = Boolean(election.registration)
  const isRegistrationStarted = haveRegistration && election.registration_at !== null

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-baseline mb-2">
        <h1 className="text-2xl font-bold leading-tight text-gray-900 mr-2">{election.name}</h1>

        <div>
          <ElectionResultLink />
          <button onClick={onClickSettings} className="btn btn-blue-link px-0 mr-3">
            <AiOutlineSetting className="inline mb-1" /> Settings
          </button>
        </div>

        <Fade delay={350} className="flex-grow flex flex-wrap my-1 md:my-0">
          <Status status={status} />
          {haveRegistration && <StatusRegistration isOngoing={isRegistrationStarted} />}
          <StatusVotingConfirmation type={election.verification_type} />
        </Fade>
      </div>

      <Paragraph truncate={300} text={election.description} />
    </div>
  )
}

export default ElectionHeader

//

const ElectionResultLink: React.FC = () => {
  const resultLink = useSelector(selectElectionResultsLink)

  if (resultLink.length === 0) return null

  return (
    <a
      href={resultLink}
      target="_blank"
      rel="noreferrer noopener"
      className="btn btn-green-link px-0 mr-3"
    >
      <FiExternalLink className="inline mb-1" /> Election Results
    </a>
  )
}
