import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

import { Fade } from 'common/components/Transitions'
import { PartyHeader, MemberStatus, OfficialsTable, OfficialsAddTable } from './components'

const Party: React.FC<{}> = () => {
  return (
    <>
      <Fade delay={100} className="mb-5">
        <PartyHeader />
      </Fade>

      <OfficialAddMembersContainer />

      <Fade delay={400} className="card overflow-x-auto">
        <OfficialsTable />
      </Fade>
    </>
  )
}

export default Party

//

const OfficialAddMembersContainer: React.FC<{}> = () => {
  const [showAddMember, setShowAddMember] = useState(false)

  return (
    <>
      <Fade in={showAddMember}>
        <div className="flex items-center mb-5">
          <h2 className="font-semibold text-gray-700 text-lg mx-3">New Members</h2>

          <button
            onClick={() => setShowAddMember(false)}
            className="btn btn-blue py-1 font-medium items-end"
          >
            <AiOutlineCheck className="inline mb-1" /> Done
          </button>
        </div>
        <Fade className="card mb-5">
          <OfficialsAddTable />
        </Fade>
      </Fade>

      <Fade delay={300} className="flex flex-wrap justify-between items-center mb-5">
        <div className="flex-grow flex flex-wrap mb-3 md:mb-0">
          <h2 className="font-bold text-gray-700 text-lg ml-3 mr-3">Members</h2>
          <MemberStatus />
        </div>

        <Fade in={!showAddMember}>
          <button
            onClick={() => setShowAddMember(true)}
            className="btn btn-blue py-2 font-semibold items-end"
          >
            + New Members
          </button>
        </Fade>
      </Fade>
    </>
  )
}
