import { createEntityAdapter } from '@reduxjs/toolkit'
import { Models } from 'api/selects'

export const sessionAdaper = createEntityAdapter<Models.Session>({
  selectId: (session) => session.id,
  sortComparer: (a, b) => b.year - a.year,
})

export const coursesAdapter = createEntityAdapter<Models.Course>({
  selectId: (course) => course.id,
})

export const positionsAdapter = createEntityAdapter<Models.Position>({
  selectId: (position) => position.id,
  sortComparer: (a, b) => a.order - b.order,
})
