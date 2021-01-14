import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { selectElection } from 'features/elections/_id_settings'

import SettingsWithFetcher from './SettingsWithFetcher'
import usePageBack from 'common/hooks/usePageBack'

interface Props {}

const SettingsWithReturn: React.FC<Props> = () => {
  const params = useParams<{ id: string }>()
  const election = useSelector(selectElection)
  const goBack = usePageBack({ to: `/elections/${params.id}` })

  return (
    <>
      <div className="my-3">
        <button
          onClick={() =>
            goBack({
              data: election,
              from: 'settings',
            })
          }
          className="btn btn-blue-link px-0"
        >
          <AiOutlineArrowLeft className="inline mb-1" /> Return to Election
        </button>
      </div>

      <SettingsWithFetcher />
    </>
  )
}

export default SettingsWithReturn
