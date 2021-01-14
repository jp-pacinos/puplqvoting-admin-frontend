import React from 'react'

interface Props {
  open: boolean
  onToggle: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MobileMenu: React.FC<Props> = ({ open, onToggle }) => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-blue-600 focus:text-white transition duration-150 ease-in-out"
        aria-label="Main menu"
        aria-expanded="false"
      >
        {!open ? (
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </div>
  )
}

export default MobileMenu
