import React from 'react'
import Logo from 'assets/images/logo.png'
import DesktopMenuLink from './DesktopMenuLink'

interface Props {}

const DesktopMenu: React.FC<Props> = () => {
  return (
    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex-shrink-0  flex items-center">
        <div className="hidden lg:inline-flex flex-1 items-center justify-center">
          <img className="h-10 w-auto" src={Logo} alt="logo" />
          <h1 className="ml-4 font-medium">PUPLCSC VOTING SYSTEM</h1>
        </div>
        <div className="block lg:hidden">
          <img className="h-10 w-auto" src={Logo} alt="logo" />
        </div>
      </div>
      {/* <!-- desktop navigation --> */}
      <div className="hidden sm:block sm:ml-6 lg:ml-16">
        <div className="flex">
          <DesktopMenuLink to="/elections">Elections</DesktopMenuLink>
          <DesktopMenuLink to="/parties">Parties</DesktopMenuLink>
          <DesktopMenuLink to="/students">Students</DesktopMenuLink>
        </div>
      </div>
    </div>
  )
}

export default DesktopMenu
