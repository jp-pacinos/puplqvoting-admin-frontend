import React from 'react'
import MobileMenuLink from './MobileMenuLink'

interface Props {
  open: boolean
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const MobileMenuContent: React.FC<Props> = ({ open, onClick }) => {
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

export default MobileMenuContent
