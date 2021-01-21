import React from 'react'

const HeaderContainer: React.FC<React.ComponentPropsWithoutRef<'nav'>> = (props) => {
  return <nav className="bg-white border-b-2 fixed w-screen z-10" {...props} />
}

export default HeaderContainer
