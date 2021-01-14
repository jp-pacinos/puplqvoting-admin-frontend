import React from 'react'

import OfficialTableRowsWithStatus from './components/OfficialTableRowsWithStatus'

interface Props {
  //
}

const OfficialTable: React.FC<Props> = () => {
  return (
    <>
      <table
        className="table officials-table table-lg stripped bg-white border-gray-800 "
        style={{ minWidth: 750 }}
      >
        <thead className="bg-gray-50 border-2 border-gray-200">
          <tr>
            <th className="w-24 text-center">
              <p className="text-center">#</p>
            </th>

            <th className="w-3/12 ">Position</th>
            <th className="w-4/12 ">
              Fullname <span className="text-gray-500 text-xs font-semibold">LN/FN/MI</span>
            </th>
            <th className="w-32">
              <p className="text-center">Picture</p>
            </th>

            <th className="w-4/12 lg:w-3/12 ">Student No.</th>
            <th className="w-2/12">Course</th>
          </tr>
        </thead>
        <tbody>
          <OfficialTableRowsWithStatus />
        </tbody>
      </table>
    </>
  )
}

export default OfficialTable
