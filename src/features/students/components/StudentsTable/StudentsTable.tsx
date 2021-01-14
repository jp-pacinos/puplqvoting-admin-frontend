import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { Fade } from 'common/components/Transitions'
import { selectStudentIds, selectFetchStatus } from 'features/students/studentsSlice/selectors'
import AllCheckBox from './components/AllCheckbox'
import StudentRow from './components/StudentRow'

interface Props {
  //
}

const StudentsTable: React.FC<Props> = () => {
  return (
    <table className="student-table table stripped bordered">
      <thead>
        <tr>
          <th className="w-2/12 md:w-1/12">
            <AllCheckBox />
          </th>
          <th className="w-4/12 lg:w-3/12">Student No.</th>
          <th className="w-4/12">
            Fullname
            <span className="text-xs text-gray-500 ml-2">LN/FN/MI</span>
          </th>
          <th className="w-2/12 md:w-1/12">Sex</th>
          <th className="w-2/12">Course</th>
          <th className="w-2/12">Actions</th>
        </tr>
      </thead>

      <tbody>
        <StudentRows />
      </tbody>
    </table>
  )
}

export default StudentsTable

//

const StudentRows: React.FC<{}> = () => {
  const studentIds = useSelector(selectStudentIds)
  const status = useSelector(selectFetchStatus)

  if (status === 'pending') {
    return (
      <tr>
        <td colSpan={6} className="font-semibold text-gray-600">
          Loading...
        </td>
      </tr>
    )
  }

  if (status === 'success') {
    return (
      <>
        {studentIds.length > 0 ? (
          <TransitionGroup component={null}>
            {studentIds.map((id, i) => {
              return (
                <Fade
                  key={id}
                  delay={20 * i}
                  renderComponent={(nodeRef) => <StudentRow ref={nodeRef} studentId={id} />}
                />
              )
            })}
          </TransitionGroup>
        ) : (
          <tr>
            <td colSpan={6} className="font-semibold text-gray-600">
              No records found.
            </td>
          </tr>
        )}
      </>
    )
  }

  if (status === 'failure') {
    return (
      <tr>
        <td colSpan={6} className="font-semibold text-gray-600">
          There was an error fetching results.
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td colSpan={6} className="font-semibold text-gray-600">
        Please wait...
      </td>
    </tr>
  )
}
