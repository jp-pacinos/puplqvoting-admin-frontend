import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

interface Props extends React.ComponentPropsWithoutRef<'button'> {}

const ButtonExportRecords: React.FC<Props> = (props) => {
  const handleExport = () => {
    console.log('export button clicked')
  }

  return (
    <button onClick={handleExport} className="btn btn-green btn-sm" {...props}>
      <AiOutlineDownload className="inline mr-1" />
      Export
    </button>
  )
}

export default React.memo(ButtonExportRecords)
