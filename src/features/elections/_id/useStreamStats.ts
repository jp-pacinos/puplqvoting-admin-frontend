import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'app/store'
import { selectStudentVotesFilters, selectElectionIsEnded, fetchStreamStats } from './slice'

const useStreamStats = () => {
  const dispatch = useDispatch<AppDispatch>()
  const votesChartFilters = useSelector(selectStudentVotesFilters)

  const isEnded = useSelector(selectElectionIsEnded)

  /**
   * update stats every 12 seconds
   */
  useEffect(() => {
    if (isEnded) return

    let promise: any = {}
    let timerId = setInterval(() => {
      promise = dispatch(
        fetchStreamStats({
          options: votesChartFilters,
        })
      )
    }, 12000)

    return () => {
      if (typeof promise.abort === 'function') promise.abort()

      clearInterval(timerId)
    }
  }, [dispatch, isEnded, votesChartFilters])
}

export default useStreamStats
