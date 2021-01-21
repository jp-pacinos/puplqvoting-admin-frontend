import React, { useState } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

import Logo from 'assets/images/logo.png'
import {
  HeaderContainer,
  HeaderBody,
  RightMenuContainer,
  ButtonMenu,
  DropdownProfile,
  MobileMenu,
} from './components'

interface Props {}

const Header: React.FC<Props> = () => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <HeaderContainer>
      <HeaderBody>
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <ButtonMenu active={openMenu} onClick={() => setOpenMenu(!openMenu)} />
        </div>

        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <div className="hidden lg:inline-flex flex-1 items-center justify-center">
              <img className="h-10 w-auto" src={Logo} alt="logo" />
              <h1 className="ml-4 font-medium">PUPLCSC VOTING SYSTEM</h1>
            </div>
            <div className="block lg:hidden">
              <img className="h-10 w-auto" src={Logo} alt="logo" />
            </div>
          </div>

          {/* navigation */}
          <div className="hidden sm:block sm:ml-6 lg:ml-16">
            <div className="flex">
              <CustomNavLink to="/elections">Elections</CustomNavLink>
              <CustomNavLink to="/parties">Parties</CustomNavLink>
              <CustomNavLink to="/students">Students</CustomNavLink>
            </div>
          </div>
        </div>

        <RightMenuContainer>
          <DropdownProfile />
        </RightMenuContainer>
      </HeaderBody>

      {/* Mobile menu, toggle classes based on menu state. Menu open: "block", Menu closed: "hidden" */}
      <MobileMenu open={openMenu} onClick={() => setOpenMenu(false)} />
    </HeaderContainer>
  )
}

export default Header

//

const CustomNavLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NavLink
      activeClassName="border-blue-500"
      className="px-4 py-3 ml-8 text-sm font-medium hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:border-blue-500 border-transparent border-solid border-b-4 transition-colors duration-100 ease-in-out"
      {...props}
    />
  )
}
