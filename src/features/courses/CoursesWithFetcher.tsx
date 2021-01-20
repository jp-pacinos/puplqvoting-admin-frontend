import React, { useState, useEffect, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import qs from 'query-string'

import { AppDispatch } from 'app/store'
import { fetchCourses } from 'features/courses'
import Courses from './Courses'

import useDebounce from 'common/hooks/useDebounce'

interface ParamQuery {
  s?: string
}

interface Props {}

const CoursesWithFetcher: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()

  // router location
  const history = useHistory()
  const location = useLocation()
  const queryParams = useMemo<ParamQuery>(() => qs.parse(location.search), [location.search])

  // search
  const [search, setSearch] = useState<string>(queryParams.s || '')

  // apply delay to search input
  const debouncedSearch = useDebounce<string>(search, 350)

  // handles displaying of proper query string to url
  useEffect(() => {
    let query = qs.stringify({ s: debouncedSearch }, { skipNull: true, skipEmptyString: true })
    history.replace(`/students/courses` + query ? `?${query}` : '')
  }, [debouncedSearch, history])

  // fetcher
  useEffect(() => {
    const promise = dispatch(fetchCourses({ search: debouncedSearch }))
    return () => {
      promise.abort()
    }
  }, [dispatch, debouncedSearch])

  return (
    <>
      <Courses
        {...{
          useSearch: () => [search, setSearch],
        }}
      />
    </>
  )
}

export default CoursesWithFetcher
