import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'app/store'
import { selectStudentVotesFilters, selectElectionIsStarted, fetchStreamStats } from './slice'

const useStreamStats = () => {
  const dispatch = useDispatch<AppDispatch>()
  const votesChartFilters = useSelector(selectStudentVotesFilters)

  const isStarted = useSelector(selectElectionIsStarted)

  /**
   * update stats every 12 seconds
   */
  useEffect(() => {
    if (!isStarted) return

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
  }, [dispatch, isStarted, votesChartFilters])
}

export default useStreamStats
