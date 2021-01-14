import React, { forwardRef } from 'react'

import { Party as PartyModel } from 'api/types/Models'
import Party from '../Party'

interface Props extends React.ComponentPropsWithRef<'div'> {
  name: string
  parties: PartyModel.Fields[] | undefined
}

const PartyElectionGroup: React.FC<Props> = forwardRef(({ name = 'Unknown', parties }, ref) => {
  if (!parties || parties.length === 0) {
    return null
  }

  return (
    <div ref={ref}>
      <div className="my-3 w-full px-4">
        <h2 className="text-gray-400 font-medium text-md"> - {name}</h2>
      </div>

      <div className="flex flex-wrap -mx-2 mb-5">
        {parties.map((party) => (
          <Party key={party.id} data={party} />
        ))}
      </div>
    </div>
  )
})

export default PartyElectionGroup
