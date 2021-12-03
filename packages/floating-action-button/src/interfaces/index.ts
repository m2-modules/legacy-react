import { RefObject } from 'react'

export enum ButtonPosition {
  RightBottomCorner = 'right-bottom-corner',
  LeftBottomCorner = 'left-bottom-corner',
}
export interface AutoHideOptions {
  containerRef: RefObject<HTMLElement>
  timer?: number
  animation?: boolean
}

export interface FloatingActionButtonProps {
  position?: ButtonPosition
  verticalMargin?: string
  horizontalMargin?: string
  autoHideOptions?: AutoHideOptions
  children: JSX.Element
}
