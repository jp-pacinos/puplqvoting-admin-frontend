import React from 'react'
import Input from 'common/components/Core/Input'

interface SearchProps extends React.ComponentPropsWithRef<'input'> {}

const Search: React.FC<SearchProps> = ({
  name = 'search',
  placeholder = 'Search...',
  className,
  ...rest
}) => {
  return (
    <div className="search">
      <Input
        type="text"
        name={name}
        placeholder={placeholder}
        className={className ? `search__input ${className}` : 'search__input'}
        {...rest}
      />
      <div className="search__icon">
        <svg
          className="fill-current pointer-events-none text-gray-600 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </div>
    </div>
  )
}

export default Search
