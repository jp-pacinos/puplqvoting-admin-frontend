import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import PartyWithFetcher from './_idWithFetcher'
import usePageBack from 'common/hooks/usePageBack'

interface Props {
  //
}

const PartyWithReturn: React.FC<Props> = () => {
  const goBack = usePageBack({
    to: '/parties',
    hasState: ['data'],
    fallbackTo: '/parties',
  })

  return (
    <>
      <div className="my-3">
        <button onClick={() => goBack()} className="btn btn-blue-link px-0">
          <AiOutlineArrowLeft className="inline mb-1" /> Return
        </button>
      </div>

      <PartyWithFetcher />
    </>
  )
}

export default PartyWithReturn
