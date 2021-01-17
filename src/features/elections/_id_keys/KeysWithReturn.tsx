import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import KeysWithFetcher from './KeysWithFetcher'
import usePageBack from 'common/hooks/usePageBack'

interface Props {}

const KeysWithReturn: React.FC<Props> = () => {
  const goBack = usePageBack()

  return (
    <>
      <div className="my-3">
        <button onClick={() => goBack()} className="btn btn-blue-link px-0">
          <AiOutlineArrowLeft className="inline mb-1" /> Return
        </button>
      </div>

      <KeysWithFetcher />
    </>
  )
}

export default KeysWithReturn
