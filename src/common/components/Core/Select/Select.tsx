import React, { useMemo } from 'react'

import { SelectProps } from './types'

const Select: React.FC<SelectProps> = ({ items, placeholder = '', className = '', ...rest }) => {
  let selectClass = useMemo(() => `select__input${className ? ` ${className}` : ''}`, [className])

  return (
    <div className="select">
      <select className={selectClass} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}

        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>

      <div className="select__icon">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}

export default React.memo(Select)
