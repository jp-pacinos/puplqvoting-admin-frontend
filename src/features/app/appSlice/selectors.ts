import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { sessionAdaper, coursesAdapter, positionsAdapter } from './adapters'

export const { selectAll: selectSessions } = sessionAdaper.getSelectors(
  (state: RootState) => state.app.sessions
)

export const {
  selectAll: selectPositions,
  selectById: selectPositionById,
  selectEntities: selectPositionEntities,
  selectIds: selectPositionIds,
} = positionsAdapter.getSelectors((state: RootState) => state.app.positions)

export const {
  selectAll: selectCourses,
  selectById: selectCourseById,
  selectIds: selectCourseIds,
} = coursesAdapter.getSelectors((state: RootState) => state.app.courses)

/**
 * select options
 */

export const selectSexOptions = (state: RootState) => state.app.sex

export const selectVoterOptions = (state: RootState) => state.app.voter

export const selectVerificationTypeOptions = (state: RootState) => state.app.verificationType

export const selectSessionOptions = createSelector(selectSessions, (sessions) => {
  return sessions.map((session) => {
    return {
      text: `${session.year} - ${session.name}`,
      value: session.id,
    }
  })
})

export const selectYesNoOptions = (state: RootState) => state.app.yesNo

export const selectSelectCourses = createSelector(selectCourses, (courses) => {
  return courses.map((course) => {
    return {
      text: `${course.acronym} - ${course.name}`,
      value: course.id,
    }
  })
})

export const selectPositionOptions = createSelector(selectPositions, (positions) => {
  return positions.map((position) => {
    return {
      text: position.name,
      value: position.id,
    }
  })
})
