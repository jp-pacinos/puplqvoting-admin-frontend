import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

import ProfileAvatar from 'assets/images/avatar.png'
import Dropdown from './Dropdown'

interface Props {
  //
}

const DropdownProfile: React.FC<Props> = () => {
  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
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
      <DropdownLink to="/profile">Account</DropdownLink>
      <DropdownLink to="/login" onClick={logout}>
        Sign out
      </DropdownLink>
    </Dropdown>
  )
}

export default DropdownProfile

//

const DropdownLink: React.FC<LinkProps> = (props) => {
  return (
    <Link
      role="menuitem"
      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
      {...props}
    />
  )
}
