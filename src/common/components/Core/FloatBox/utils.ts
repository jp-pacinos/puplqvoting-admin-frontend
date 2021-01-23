import { PositionProps, DirectionProps } from './types'

export const getClassByPositon = (position: DirectionProps, direction: keyof PositionProps) => {
  switch (position) {
    case 'middle':
      return direction === 'x' ? 'floatbox__middle__x' : 'floatbox__middle__y'
    case 'left':
      return 'left-0 ml-8'
    case 'right':
      return 'right-0 mr-8'
    case 'top':
      return 'top-0 mt-8'
    case 'bottom':
      return 'bottom-0 mb-8'
  }
}

export const getBaseClassName = (position: PositionProps) => {
  let className = 'floatbox'

  if (position.x === 'middle' && position.y === 'middle') {
    return `${className} floatbox__middle`
  }

  return `${className} ${getClassByPositon(position.x, 'x')} ${getClassByPositon(position.y, 'y')}`
}
