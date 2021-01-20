import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { Fade } from 'common/components/Transitions'
import { selectFetchStatus, selectCourseIds } from 'features/courses'
import { CourseRow } from './components'

interface Props {}

const CoursesTable: React.FC<Props> = () => {
  return (
    <table className="table stripped bordered course-table">
      <thead>
        <tr>
          <th className="w-1/12"># ID</th>
          <th className="w-6/12">Name</th>
          <th className="w-2/12">Acronym</th>
          <th className="w-2/12">Actions</th>
        </tr>
      </thead>

      <tbody>
        <CoursesTableWithStatus />
      </tbody>
    </table>
  )
}

export default React.memo(CoursesTable)

//

const CoursesTableWithStatus: React.FC = () => {
  const status = useSelector(selectFetchStatus)
  const courseIds = useSelector(selectCourseIds)

  if (status === 'pending' || status === 'success') {
    return (
      <>
        {courseIds.length > 0 ? (
          <TransitionGroup component={null}>
            {courseIds.map((id, i) => {
              return (
                <Fade
                  key={id}
                  delay={10 * i}
                  renderComponent={(nodeRef) => <CourseRow ref={nodeRef} courseId={id} />}
                />
              )
            })}
          </TransitionGroup>
        ) : (
          <tr>
            <td colSpan={4} className="font-semibold text-gray-600 text-center">
              {status === 'success' ? 'No records found.' : 'Loading...'}
            </td>
          </tr>
        )}
      </>
    )
  }

  if (status === 'failure') {
    return (
      <tr>
        <td colSpan={4} className="font-semibold text-gray-600 text-center">
          There was an error fetching results.
        </td>
      </tr>
    )
  }

  return (
    <tr>
      <td colSpan={4} className="font-semibold text-gray-600 text-center">
        Please wait...
      </td>
    </tr>
  )
}
