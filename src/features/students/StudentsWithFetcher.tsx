import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import qs from 'query-string'

import { useDebounce } from 'common/hooks'
import { fetchStudents } from 'features/students/studentsSlice'
import { ParamQuery, FilterProps } from './types'

import Students from './Students'

interface Props {}

const StudentsWithFetcher: React.FC<Props> = () => {
  const dispatch = useDispatch()

  // router location
  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo<ParamQuery>(() => qs.parse(location.search), [location.search])

  // filters
  const [page, setPage] = useState<number>(parseInt(queryParams.page || '1'))
  const [perPage, setPerPage] = useState<number>(parseInt(queryParams.perpage || '10'))
  const [search, setSearch] = useState<string>(queryParams.s || '')
  const [filters, setFilters] = useState<FilterProps>({
    course: queryParams.course || '',
    year: queryParams.year || '',
    gender: queryParams.gender || '',
    voter: queryParams.voter || '',
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

    history.replace('/students' + query ? `?${query}` : '')
  }, [history, debouncedSearch, filters, page, perPage])

  // handles fetching of students by listening to search, filter, pagination
  useEffect(() => {
    const _filters = {
      studentNumber: debouncedSearch,
      courseId: filters.course,
      yearLevel: filters.year,
      gender: filters.gender,
      voter: filters.voter,
    }

    const promise: any = dispatch(fetchStudents({ page, perPage, filters: _filters }))

    return () => {
      promise.abort()
    }
  }, [dispatch, debouncedSearch, filters, page, perPage])

  return (
    <>
      <Students
        {...{
          usePage: () => [page, setPage],
          usePerPage: () => [perPage, setPerPage],
          useSearch: () => [[search, debouncedSearch], setSearch],
          useFilters: () => [filters, setFilters],
        }}
      />
    </>
  )
}

export default StudentsWithFetcher
