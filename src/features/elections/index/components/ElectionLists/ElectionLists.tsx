import React from 'react'
import { useSelector } from 'react-redux'
import sortBy from 'lodash/sortBy'

import { Fade } from 'common/components/Transitions'
import { selectElections, selectStatus } from 'features/elections/index/slice'
import { ElectionItem } from 'features/elections/index/components'
import { Pagination } from './components'

interface Props {
  usePage: [number, React.Dispatch<React.SetStateAction<number>>]
}

const ElectionLists: React.FC<Props> = ({ usePage }) => {
  const elections = useSelector(selectElections)
  const status = useSelector(selectStatus)

  let RenderElectionLists: React.ReactNode[] = []
  sortBy(elections, ['year', 'created_at'])
    .reverse()
    .forEach((election, i, elections) => {
      let delay = i * 125

      // if the election's year is different from previous year, render the title.
      if (i === 0 || elections[--i].year !== election.year) {
        RenderElectionLists.push(
          <Fade delay={delay} key={election.year} className="my-5 w-full px-4 text-center">
            <h2 className="text-gray-400 font-medium text-md"> - {election.year} - </h2>
          </Fade>
        )
      }

      RenderElectionLists.push(
        <Fade delay={delay} key={election.id}>
          <ElectionItem election={election} />
        </Fade>
      )
    })

  if (status === 'pending' && RenderElectionLists.length === 0) {
    return (
      <div className="text-center">
        <p className="my-10 text-gray-500 font-semibold">Loading...</p>
      </div>
    )
  }

  if (RenderElectionLists.length === 0) {
    return (
      <div className="text-center">
        <p className="my-10 text-gray-500 font-semibold">No results found.</p>
      </div>
    )
  }

  if (status === 'failure') {
    return (
      <div className="text-center">
        <p className="my-10 text-gray-500 font-semibold">There was an error on loading records.</p>
      </div>
    )
  }

  return (
    <>
      {RenderElectionLists}

      <Pagination usePage={usePage} />
    </>
  )
}

export default React.memo(ElectionLists)
