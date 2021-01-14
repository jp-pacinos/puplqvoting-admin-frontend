import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

const MobileMenuLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NavLink
      {...props}
      activeClassName="bg-blue-600 text-white"
      className="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-600 transition duration-150 ease-in-out"
    />
  )
}

export default MobileMenuLink
