import React from 'react'

import { Fade } from 'common/components/Transitions'
import { ElectionHeader, BasicStats, StudentVotesChart, StudentVotesSummary } from './components'

import useStreamStats from './useStreamStats'

interface Props {
  //
}

const Election: React.FC<Props> = () => {
  useStreamStats()

  return (
    <>
      <Fade delay={75} className="mb-5">
        <ElectionHeader />
      </Fade>

      <Fade delay={175} className="mb-5">
        <BasicStats />
      </Fade>

      <Fade delay={525} className="mb-5">
        <StudentVotesChart />
      </Fade>

      <Fade delay={850} className="mb-5">
        <StudentVotesSummary />
      </Fade>
    </>
  )
}

export default Election
