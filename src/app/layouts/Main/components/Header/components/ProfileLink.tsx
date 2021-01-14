import React from 'react'
import { Link, LinkProps } from 'react-router-dom'

const ProfileLink: React.FC<LinkProps> = (props) => {
  return (
    <Link
      {...props}
      role="menuitem"
      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
    />
  )
}

export default ProfileLink
