import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useHistory, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import qs from 'query-string'

import { AppDispatch } from 'app/store'
import { fetchStudentKeys } from 'features/elections/_id_keys'

import useDebounce from 'common/hooks/useDebounce'
import { FilterProps } from './components/Filters'
import Keys from './Keys'

export interface ParamQuery {
  page?: string
  perpage?: string
  s?: string
  course?: string
  gender?: string
  code?: string
}

export interface Props {}

const KeysWithFetcher: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()

  // router location
  const history = useHistory()
  const routeParams = useParams<{ id: string }>()
  const location = useLocation()
  const queryParams = useMemo<ParamQuery>(() => qs.parse(location.search), [location.search])

  // filters
  const [page, setPage] = useState<number>(parseInt(queryParams.page || '1'))
  const [perPage, setPerPage] = useState<number>(parseInt(queryParams.perpage || '10'))
  const [search, setSearch] = useState<string>(queryParams.s || '')
  const [filters, setFilters] = useState<FilterProps>({
    course: queryParams.course || '',
    gender: queryParams.gender || '',
    code: queryParams.code || '',
  })

  // apply delay to search input
  const debouncedSearch = useDebounce<string>(search, 350)

  // handles displaying of proper query string to url
  useEffect(() => {
    let params = {
      page,
      perpage: perPage,
      s: debouncedSearch,
      ...filters,
    }

    let query = qs.stringify(params, { skipNull: true, skipEmptyString: true })

    history.replace(`/elections/${routeParams.id}/keys` + query ? `?${query}` : '')
  }, [debouncedSearch, filters, history, page, perPage, routeParams.id])

  // fetcher
  useEffect(() => {
    const promise = dispatch(
      fetchStudentKeys({
        sessionId: parseInt(routeParams.id),
        filters: {
          page: page,
          perpage: perPage,
          studentNumber: debouncedSearch,
          courseId: filters.course,
          gender: filters.gender,
          code: filters.code,
        },
      })
    )

    return () => {
      promise.abort()
    }
  }, [
    debouncedSearch,
    dispatch,
    filters.code,
    filters.course,
    filters.gender,
    page,
    perPage,
    routeParams.id,
  ])

  return (
    <>
      <Keys
        {...{
          usePage: () => [page, setPage],
          usePerPage: () => [perPage, setPerPage],
          useSearch: () => [search, setSearch],
          useFilters: () => [filters, setFilters],
        }}
      />
    </>
  )
}

export default KeysWithFetcher
