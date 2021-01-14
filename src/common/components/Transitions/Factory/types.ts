import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

export type DelayProp = {
  delay: number
}

export type RenderComponentProp<T> = {
  renderComponent: (nodeRef: React.MutableRefObject<T>) => React.ReactNode | null
}

export type ParentTransitionProps<
  T = null,
  Ref extends undefined | HTMLElement = undefined
> = Partial<DelayProp> & Partial<RenderComponentProp<T>> & CSSTransitionProps<Ref>

export type TransitionProps<
  T = null,
  Ref extends undefined | HTMLElement = undefined
> = Partial<DelayProp> & Partial<RenderComponentProp<T>> & Partial<CSSTransitionProps<Ref>>

export type TransitionWithDelayProps<Ref extends undefined | HTMLElement = undefined> = DelayProp &
  CSSTransitionProps<Ref>
