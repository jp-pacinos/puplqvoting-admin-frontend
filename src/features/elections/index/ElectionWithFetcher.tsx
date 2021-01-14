import React, { useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import qs from 'query-string'

import { AppDispatch } from 'app/store'
import { useDebounce } from 'common/hooks'
import { fetchElections } from './slice'

import Election from './Election'

interface Props {}

const ElectionWithFetcher: React.FC<Props> = () => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo<{ page?: string; search?: string }>(() => qs.parse(location.search), [
    location.search,
  ])

  const [page, setPage] = useState<number>(parseInt(queryParams.page || '1'))
  const [search, setSearch] = useState<string>(queryParams.search || '')

  const dispatch = useDispatch<AppDispatch>()

  const debouncedSearch = useDebounce<string>(search, 350)

  // handles displaying of proper query string to url
  useEffect(() => {
    let params = { page, search: debouncedSearch }
    let query = qs.stringify(params, { skipNull: true, skipEmptyString: true })
    let url = '/elections' + query ? `?${query}` : ''
    history.replace(url)
  }, [debouncedSearch, history, page])

  // fetch elections
  useEffect(() => {
    const promise = dispatch(fetchElections({ page, search: debouncedSearch }))
    return () => {
      promise.abort()
    }
  }, [debouncedSearch, dispatch, page])

  return (
    <>
      <Election
        {...{
          usePage: [page, setPage],
          useSearch: [search, setSearch],
        }}
      />
    </>
  )
}

export default ElectionWithFetcher
