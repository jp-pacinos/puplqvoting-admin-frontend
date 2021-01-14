import React from 'react'

interface Props {
  id: string | undefined
  label: string
  required?: boolean
  inputRender: React.ReactNode
}

const FormGroup: React.FC<Props> = ({ id, label, required = false, inputRender = null }) => {
  return (
    <div className="mb-3 md:flex md:items-center">
      <div className="md:w-1/3">
        <label htmlFor={id} className="block text-gray-500 font-normal mb-1 md:mb-0 pr-4">
          {label}
          {required && <Required />}
        </label>
      </div>
      <div className="md:w-2/3">{inputRender}</div>
    </div>
  )
}

export default React.memo(FormGroup)

//
const Required = React.memo(() => <span className="text-red-400 font-bold ml-1">*</span>)
