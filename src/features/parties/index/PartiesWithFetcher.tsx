import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'

import { AppDispatch } from 'app/store'
import { useDebounce } from 'common/hooks'
import { fetchParties, selectResponseStatus } from './slice'
import Parties from './Parties'

interface Props {
  //
}

const PartiesWithFetcher: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()

  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo<{ page?: string; search?: string; election?: string }>(
    () => qs.parse(location.search),
    [location.search]
  )

  const [page, setPage] = useState<number>(parseInt(queryParams.page || '1'))
  const [search, setSearch] = useState<string>(queryParams.search || '')
  const [election, setElection] = useState<string>(queryParams.election || '')
  const status = useSelector(selectResponseStatus)

  // apply delay to search input
  const debouncedSearch = useDebounce<string>(search, 350)

  // handles displaying of proper query string to url
  useEffect(() => {
    let params = { page, election, search: debouncedSearch }
    let query = qs.stringify(params, { skipNull: true, skipEmptyString: true })
    let url = '/parties' + query ? `?${query}` : ''
    history.replace(url)
  }, [debouncedSearch, election, history, page])

  // fetch new records when filter changes
  useEffect(() => {
    const promise = dispatch(
      fetchParties({ page, filters: { s: debouncedSearch, session: parseInt(election) } })
    )

    return () => {
      promise.abort()
    }
  }, [debouncedSearch, dispatch, election, page])

  return (
    <>
      <Parties
        {...{
          status,
          usePage: () => [page, setPage],
          useSearch: () => [[search, debouncedSearch], setSearch],
          useElection: () => [election, setElection],
        }}
      />
    </>
  )
}

export default PartiesWithFetcher
