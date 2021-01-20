import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineTrash } from 'react-icons/hi'
import { FiX } from 'react-icons/fi'

import { AppDispatch } from 'app/store'
import FloatBox, { PositionProps } from 'common/components/Core/FloatBox'
import {
  checkboxToggleAll,
  selectElectionId,
  selectCheckedCount,
  selectStudentKeys,
  groupDeleteModalOpen,
  groupGenerateKeys,
} from 'features/elections/_id_keys'

const position: PositionProps = { x: 'middle', y: 'bottom' }

interface Props {
  //
}

const KeysTableGroupActions: React.FC<Props> = () => {
  const { all, withCode } = useSelector(selectCheckedCount)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(checkboxToggleAll(false))
  }

  const handleDeleteKeys = () => {
    dispatch(groupDeleteModalOpen())
  }

  let withoutCode = all - withCode

  return (
    <FloatBox open={all + withCode > 0} onClose={handleClose} position={position}>
      <div className="card rounded-lg shadow-2xl mb-0 z-10">
        <div className="flex items-center">
          <div className="mr-3">
            <p className="text-gray-800 text-sm font-semibold uppercase">Actions:</p>
          </div>
          {withoutCode > 0 && <ButtonGroupGenerateKeys selectedCount={withoutCode} />}
          {withCode > 0 && (
            <button
              onClick={handleDeleteKeys}
              className="mx-1 rounded-full text-md bg-red-400 text-white hover:bg-red-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
            >
              <HiOutlineTrash className="inline text-2xl" /> Delete {`(${withCode})`}
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-2 ml-1 rounded-full hover:bg-gray-200  focus:outline-none transition-colors ease-in-out duration-100"
          >
            <FiX className="text-gray-800 text-2xl" />
          </button>
        </div>
      </div>
    </FloatBox>
  )
}

export default KeysTableGroupActions

//

const ButtonGroupGenerateKeys: React.FC<{ selectedCount: number }> = ({ selectedCount }) => {
  const electionId = useSelector(selectElectionId)
  const studentKeys = useSelector(selectStudentKeys)
  const dispatch = useDispatch<AppDispatch>()

  const [loading, setLoading] = useState(false)

  if (!studentKeys) return null

  const handleGenerateKeys = () => {
    let studentIds = []
    for (let i = 0; i < studentKeys.length; i++) {
      if (studentKeys[i].checked && studentKeys[i].confirmation_code === null) {
        studentIds.push(studentKeys[i].id)
      }
    }

    setLoading(true)
    dispatch(
      groupGenerateKeys({
        sessionId: electionId as number,
        studentIds,
      })
    )
  }

  return (
    <button
      onClick={handleGenerateKeys}
      className="mx-1 rounded-full text-md bg-blue-400 text-white hover:bg-blue-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
      disabled={loading}
    >
      Generate {`(${selectedCount})`}
    </button>
  )
}
