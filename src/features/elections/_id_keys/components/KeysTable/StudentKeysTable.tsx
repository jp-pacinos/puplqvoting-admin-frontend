import React, { useState } from 'react'
import { Checkbox } from 'common/components/Core'

import { TableAllCheckbox } from './components'

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
        <tr>
          <td>
            <Checkbox className="block m-auto text-blue-400" />
          </td>
          <td>2015-99732-LQ-0</td>
          <td>Abbott, Wilhelmine DDS</td>
          <td>F</td>
          <td>DIPG</td>
          <td>wq4ccAx</td>
        </tr>
        <tr>
          <td>
            <Checkbox className="block m-auto text-blue-400" />
          </td>
          <td>2015-99732-LQ-0</td>

          <td>Abbott, Wilhelmine DDS</td>
          <td>F</td>
          <td>DIPG</td>
          <td>
            <button className="btn btn-gray btn-sm hover:bg-blue-500 hover:text-white">
              Generate
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default StudentKeysTable
