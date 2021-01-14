import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'app/store'
import { studentsSearch } from 'features/parties/_id'

import OfficialAddTable from './OfficialsAddTable'
import { UseFilters } from './types'

interface Props extends UseFilters {
  //
}

const OfficialsAddTableWithFetcher: React.FC<Props> = ({ useFilters }) => {
  const [[state, debouncedState]] = useFilters()
  const [page, setPage] = useState(1)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setPage(1)
  }, [state])

  useEffect(() => {
    let filters = {
      ...debouncedState,
      studentnumber: debouncedState.student_number,
      courseid: debouncedState.course_id,
    }

    let promise = dispatch(studentsSearch({ page, filters }))

    return () => {
      promise.abort()
    }
  }, [debouncedState, dispatch, page, state])

  return (
    <>
      <OfficialAddTable usePage={() => [page, setPage]} />
    </>
  )
}

export default OfficialsAddTableWithFetcher
