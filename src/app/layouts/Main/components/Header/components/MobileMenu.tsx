import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

interface Props {
  open: boolean
  onClick: React.ComponentPropsWithoutRef<'a'>['onClick']
}

const MobileMenu: React.FC<Props> = ({ open, onClick }) => {
  return (
    <div className={`${!open && 'hidden'} sm:hidden`}>
      <div className="px-2 pt-2 pb-3">
        <MobileMenuLink onClick={onClick} to="/elections">
          Elections
        </MobileMenuLink>
        <MobileMenuLink onClick={onClick} to="/parties">
          Parties
        </MobileMenuLink>
        <MobileMenuLink onClick={onClick} to="/students">
          Students
        </MobileMenuLink>
      </div>
    </div>
  )
}

export default MobileMenu

//

const MobileMenuLink: React.FC<NavLinkProps> = (props) => {
  return (
    <NavLink
      activeClassName="bg-blue-600 text-white"
      className="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-blue-500 focus:outline-none focus:text-white focus:bg-blue-600 transition duration-150 ease-in-out"
      {...props}
    />
  )
}
