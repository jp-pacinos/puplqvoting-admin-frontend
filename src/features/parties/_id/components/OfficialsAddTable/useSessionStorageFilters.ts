import { useState, useEffect } from 'react'
import { useDebounce } from 'common/hooks'
import { StudentFilters, UseFilters } from './types'

const sessionKey = 'parties-student-search'

const useSessionStorageFilters: UseFilters['useFilters'] = () => {
  const [state, setState] = useState<StudentFilters>({
    student_number: '',
    lastname: '',
    firstname: '',
    middlename: '',
    course_id: '',
  })

  const debouncedState = useDebounce(state, 350)

  useEffect(() => {
    let str = sessionStorage.getItem(sessionKey)
    let state = str ? JSON.parse(str) : {}

    let haveValue = Object.entries(state).some((obj) => obj[1])
    if (!haveValue) return

    setState((prev) => ({ ...prev, ...state }))
  }, [])

  useEffect(() => {
    sessionStorage.setItem(sessionKey, JSON.stringify(debouncedState))
  }, [debouncedState])

  return [[state, debouncedState], setState]
}

export default useSessionStorageFilters
