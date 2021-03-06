import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'

import { FadeGrow } from 'common/components/Transitions'

type RenderContentParams = {
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

interface Props {
  renderContent: (params: RenderContentParams) => React.ReactNode
  childrenProps?: React.ComponentPropsWithoutRef<'div'>
}

const Dropdown: React.FC<Props> = ({ renderContent, children, childrenProps = {} }) => {
  const [active, setActive] = useState(false)

  return (
    <ClickAwayListener className="relative" onClickAway={() => setActive(false)}>
      <div>{renderContent({ active, setActive })}</div>

      <FadeGrow
        in={active}
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
      >
        <div
          className="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdown-menu"
          {...childrenProps}
        >
          {React.Children.map(children, (child: any) => {
            return <div onClick={() => setActive(false)}>{child}</div>
          })}
        </div>
      </FadeGrow>
    </ClickAwayListener>
  )
}

export default Dropdown
