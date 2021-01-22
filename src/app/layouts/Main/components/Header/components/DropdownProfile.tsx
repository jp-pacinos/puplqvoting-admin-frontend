import React from 'react'
import { Link } from 'react-router-dom'

import ProfileAvatar from 'assets/images/avatar.png'
import Dropdown from './Dropdown'

import useClearSession from 'common/hooks/useClearSession'

const dropdownLinkStyle =
  'block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'

interface Props {}

const DropdownProfile: React.FC<Props> = () => {
  const clearSession = useClearSession({ reload: true })

  const onClickLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    clearSession()
  }

  return (
    <Dropdown
      renderContent={({ active, setActive }) => (
        <button
          onClick={() => setActive(!active)}
          className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
        >
          <img className="h-8 w-8 rounded-full" src={ProfileAvatar} alt="admin" />
        </button>
      )}
      childrenProps={{ 'aria-labelledby': 'user-menu' }}
    >
      <Link role="menuitem" to="/profile" className={dropdownLinkStyle}>
        Account
      </Link>
      <a onClick={onClickLogout} role="menuitem" href="/logout" className={dropdownLinkStyle}>
        Sign out
      </a>
    </Dropdown>
  )
}

export default DropdownProfile
