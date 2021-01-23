import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'

import { IconButton } from 'common/components/Core'
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
        <IconButton
          onClick={() => setActive(!active)}
          className="bg-gray-200 text-lg border hover:text-blue-500 focus:bg-blue-500 focus:text-white focus:shadow-lg"
          title="Account"
          id="user-menu"
          aria-label="User menu"
          aria-haspopup="true"
        >
          <AiOutlineUser />
        </IconButton>
      )}
      childrenProps={{ 'aria-labelledby': 'user-menu' }}
    >
      <Link role="menuitem" to="/account" className={dropdownLinkStyle}>
        Account
      </Link>
      <a onClick={onClickLogout} role="menuitem" href="/logout" className={dropdownLinkStyle}>
        Sign out
      </a>
    </Dropdown>
  )
}

export default DropdownProfile
