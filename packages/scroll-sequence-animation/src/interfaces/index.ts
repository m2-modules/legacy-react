import { RefObject } from 'react'

interface ScrollSequenceAnimationProps {
  containerRef: RefObject<Element>
  imagesURLs: string[]
  heightRatio: number
  wrapperHeight: string
  startScrollY?: number
  endScrollY?: number
  verticalAlign?: 'top' | 'middle' | 'bottom'
}

export default ScrollSequenceAnimationProps
