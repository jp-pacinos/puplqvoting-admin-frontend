import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'app/store'
import { selectStudentVotesFilters, fetchStreamStats } from './slice'

const useStreamStats = () => {
  const dispatch = useDispatch<AppDispatch>()
  const votesChartFilters = useSelector(selectStudentVotesFilters)

  /**
   * update stats every 12 seconds
   */
  useEffect(() => {
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
  }, [dispatch, votesChartFilters])
}

export default useStreamStats
