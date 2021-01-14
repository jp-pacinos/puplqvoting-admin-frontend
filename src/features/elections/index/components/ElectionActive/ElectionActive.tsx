import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'app/store'
import { Fade } from 'common/components/Transitions'
import { fetchActiveElection, selectActiveElection } from 'features/elections/index/slice'
import { ElectionItem } from 'features/elections/index/components'

interface Props {}

const ElectionActive: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const election = useSelector(selectActiveElection)

  useEffect(() => {
    let promise = dispatch(fetchActiveElection({}))
    return () => {
      promise.abort()
    }
  }, [dispatch])

  if (!election) return null

  return (
    <Fade>
      <div className="my-3 w-full px-4">
        <h2 className="text-gray-400 font-medium text-md">Selected Election</h2>
      </div>

      <ElectionItem election={election} />

      <div className="my-8 w-full border-b border-gray-300"></div>
    </Fade>
  )
}

export default React.memo(ElectionActive)
