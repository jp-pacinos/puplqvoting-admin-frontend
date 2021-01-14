import React, { useCallback } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import ElectionWithFetcher from './_idWithFetcher'
import { useHistory } from 'react-router-dom'

interface Props {
  //
}

const PartyWithReturn: React.FC<Props> = () => {
  const history = useHistory<{ data?: any; from?: string }>()

  const goBack = useCallback(() => {
    if (history.location.state && history.location.state.from !== 'settings') {
      history.goBack()
      return
    }

    history.push('/elections')
  }, [history])

  return (
    <>
      <div className="my-3">
        <button onClick={goBack} className="btn btn-blue-link px-0">
          <AiOutlineArrowLeft className="inline mb-1" /> Return
        </button>
      </div>

      <ElectionWithFetcher />
    </>
  )
}

export default PartyWithReturn
