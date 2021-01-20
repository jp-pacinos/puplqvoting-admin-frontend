import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import { useSelector } from 'react-redux'

import { Fade } from 'common/components/Transitions'
import { selectStudentKeyIds, selectFetchStatus } from 'features/elections/_id_keys'
import { TableAllCheckbox, TableKeyRow } from './components'

interface Props {}

const StudentKeysTable: React.FC<Props> = () => {
  return (
    <table className="student-table table stripped bordered">
      <thead>
        <tr>
          <th className="w-2/12 md:w-1/12">
            <TableAllCheckbox />
          </th>
          <th className="w-4/12 lg:w-3/12">Student No.</th>

          <th className="w-4/12">
            Fullname
            <span className="text-xs text-gray-500 ml-2">LN/FN/MI</span>
          </th>
          <th className="w-2/12 md:w-1/12">Sex</th>
          <th className="w-2/12">Course</th>
          <th className="w-2/12">Code</th>
        </tr>
      </thead>

      <tbody>
        <StudentKeyRows />
      </tbody>
    </table>
  )
}

export default StudentKeysTable

//

const StudentKeyRows: React.FC = () => {
  const status = useSelector(selectFetchStatus)
  const keyIds = useSelector(selectStudentKeyIds)

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
        {keyIds.length > 0 ? (
          <TransitionGroup component={null}>
            {keyIds.map((id, i) => {
              return (
                <Fade
                  key={id}
                  delay={10 * i}
                  renderComponent={(nodeRef) => <TableKeyRow ref={nodeRef} keyId={id as number} />}
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
