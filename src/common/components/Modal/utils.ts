import { positions, sizes } from './types'

export function getPosition(position: positions): string {
  switch (position) {
    case 'top': {
      return 'items-start'
    }
    case 'center': {
      return 'items-center'
    }
    default: {
      return 'items-center'
    }
  }
}

export function getSize(size: sizes): string {
  switch (size) {
    case 'sm': {
      return 'sm:max-w-sm'
    }
    case 'md': {
      return 'sm:max-w-md'
    }
    case 'lg': {
      return 'sm:max-w-lg'
    }
    case '2xl': {
      return 'sm:max-w-2xl'
    }
    case '3xl': {
      return 'sm:max-w-3xl'
    }
    case '4xl': {
      return 'sm:max-w-4xl'
    }
    case '5xl': {
      return 'sm:max-w-5xl'
    }
    default: {
      return 'sm:max-w-md'
    }
  }
}
