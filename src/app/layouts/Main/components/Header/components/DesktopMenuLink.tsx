import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

const DesktopMenuLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NavLink
      {...props}
      activeClassName="border-blue-500"
      className="px-4 py-3 ml-8 text-sm font-medium hover:bg-gray-100 hover:text-blue-500 focus:outline-none focus:border-blue-500 border-transparent border-solid border-b-4 transition-colors duration-100 ease-in-out"
    />
  )
}

export default DesktopMenuLink
