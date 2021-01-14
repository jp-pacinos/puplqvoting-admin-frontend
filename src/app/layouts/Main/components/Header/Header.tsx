import React, { useState, memo } from 'react'
import ProfileAvatar from 'assets/images/avatar.png'

import InnerHeader from './components/InnerHeader'
import DesktopMenu from './components/DesktopMenu'
import MobileMenu from './components/MobileMenu'
import MobileMenuContent from './components/MobileMenuContent'

import ProfileLink from './components/ProfileLink'

interface Props {}

const Header: React.FC<Props> = () => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav className="bg-white border-b-2 fixed w-screen z-10">
      <InnerHeader>
        {/* mobile menu */}
        <MobileMenu open={openMenu} onToggle={() => setOpenMenu(!openMenu)} />
        {/* desktop menu */}
        <DesktopMenu />
        {/* notif - admin */}
        <RightMenu />
      </InnerHeader>

      {/* Mobile menu, toggle classes based on menu state. Menu open: "block", Menu closed: "hidden" */}
      <MobileMenuContent open={openMenu} onClick={() => setOpenMenu(false)} />
    </nav>
  )
}

export default memo(Header)

//

const RightMenu = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* notification */}
      <button
        className="p-1 border-2 border-transparent text-gray-800 rounded-full hover:text-blue-500 focus:outline-none focus:text-white focus:bg-blue-500 transition duration-150 ease-in-out"
        aria-label="Notifications"
      >
        {/* <!-- Heroicon name: bell --> */}
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>

      {/* Profile dropdown */}
      <div className="ml-3 relative">
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
          >
            <img className="h-8 w-8 rounded-full" src={ProfileAvatar} alt="admin" />
          </button>
        </div>

        {/* toggle */}
        <div
          className={`${
            !open && 'hidden'
          } origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg`}
        >
          <div
            className="py-1 rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <ProfileLink to="/profile">Your Profile</ProfileLink>
            <ProfileLink to="/logout">Sign out</ProfileLink>
          </div>
        </div>
      </div>
    </div>
  )
}
