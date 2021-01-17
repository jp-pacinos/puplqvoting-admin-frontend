import React from 'react'
import { FiX } from 'react-icons/fi'
import { HiOutlineTrash } from 'react-icons/hi'

import FloatBox, { PositionProps } from 'common/components/Core/FloatBox'

const position: PositionProps = { x: 'middle', y: 'bottom' }

interface Props {
  //
}

let haveCodeCount = 1

const KeysTableGroupActions: React.FC<Props> = () => {
  return (
    <FloatBox open={false} onClose={() => {}} position={position}>
      <div className="card rounded-lg shadow-2xl mb-0 z-10">
        <div className="flex items-center">
          <div className="mr-3">
            <p className="text-gray-800 text-sm font-semibold uppercase">Actions:</p>
          </div>
          <button
            onClick={() => {}}
            className="mx-1 rounded-full text-md bg-blue-400 text-white hover:bg-blue-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
          >
            Generate
          </button>
          {haveCodeCount > 0 && (
            <button
              onClick={() => {}}
              className="mx-1 rounded-full text-md bg-red-400 text-white hover:bg-red-700 px-4 py-1 focus:outline-none transition-colors ease-in-out duration-100"
            >
              <HiOutlineTrash className="inline text-2xl" /> Delete {`(${haveCodeCount})`}
            </button>
          )}
          <button
            onClick={() => {}}
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
