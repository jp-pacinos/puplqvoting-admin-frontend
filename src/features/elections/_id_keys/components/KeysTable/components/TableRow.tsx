import React from 'react'

import { Checkbox } from 'common/components/Core'

interface Props {}

const TableRow: React.FC<Props> = () => {
  let studentId: number | string = 1
  let code: string | null = 'wq4ccAx'

  return (
    <tr>
      <td>
        <Checkbox className="block m-auto text-blue-400" />
      </td>
      <td>2015-99732-LQ-0</td>
      <td>Abbott, Wilhelmine DDS</td>
      <td>F</td>
      <td>DIPG</td>
      <td>{code ? code : <ButtonGenerate studentId={studentId} />}</td>
    </tr>
  )
}

export default React.memo(TableRow)

//

interface ButtonGenerateProps extends React.ComponentPropsWithoutRef<'button'> {
  studentId: number | string
}

const ButtonGenerate: React.FC<ButtonGenerateProps> = ({ studentId, ...rest }) => {
  const handleGenerate = () => {
    console.log('generate code for ', studentId)
  }

  return (
    <button
      onClick={handleGenerate}
      className="btn btn-gray btn-sm hover:bg-blue-500 hover:text-white"
      {...rest}
    >
      Generate
    </button>
  )
}
