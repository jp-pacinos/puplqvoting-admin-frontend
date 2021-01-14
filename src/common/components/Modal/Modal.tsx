import React, { useRef, useMemo } from 'react'

import { ModalPortal } from 'common/components'
import { Fade, SlideDown } from 'common/components/Transitions'
import { getPosition, getSize } from './utils'
import { ModalProps } from './types'

const baseRootClass = 'fixed inset-0 overflow-y-auto'

const baseModalPositionClass =
  'flex justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'

const baseModalSizeClass =
  'w-full bg-white sm:my-8 sm:align-middle inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all'

const Modal: React.FC<ModalProps> = ({
  name = 'modal',
  size = 'md',
  position = 'top',
  className = 'z-10',
  open,
  onClose,
  children,
}) => {
  const divVoidRef = useRef<HTMLDivElement>(null)

  // let rootClass = `${!open ? 'hidden' : ''} ${baseRootClass} ${className}`
  let rootClass = `${baseRootClass} ${className}`

  let modalPositionClass = useMemo(() => `${baseModalPositionClass} ${getPosition(position)}`, [
    position,
  ])

  let modalSizeClass = useMemo(() => `${baseModalSizeClass} ${getSize(size)}`, [size])

  const handleOnClickAway = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (divVoidRef.current !== e.target) return
    onClose(e)
  }

  return (
    <ModalPortal>
      <Fade in={open} className={rootClass} onClick={handleOnClickAway}>
        <div className={modalPositionClass}>
          <div className="fixed inset-0 transition-opacity">
            <div ref={divVoidRef} className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <SlideDown in={open}>
            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            {position === 'center' && (
              <>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
              </>
            )}

            {/* content */}
            <div className={modalSizeClass} role="dialog" aria-modal="true" aria-labelledby={name}>
              {children}
            </div>
          </SlideDown>
        </div>
      </Fade>
    </ModalPortal>
  )
}

export default Modal
