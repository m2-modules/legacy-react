import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import ScrollSequenceAnimationProps from './interfaces'
import styled from 'styled-components'
import useImagePreload from './hooks/use-image-preload'
import useWindowResizeHandler from './hooks/use-window-resize-handler'

const Wrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
`

const StyledCanvas = styled.canvas<{ top?: string }>`
  position: sticky;
  top: ${(props) => props.top || '50%'};
  transform: ${(props) => (!props.top ? 'translateY(-50%)' : 'none')};
`

const ScrollSequenceAnimation = ({
  container,
  imagesURLs,
  canvasHeight,
  wrapperHeight,
  startScrollY,
  endScrollY,
  topPadding,
}: ScrollSequenceAnimationProps): JSX.Element => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(
    null
  )
  const [
    canvasContext,
    setCanvasContext,
  ] = useState<CanvasRenderingContext2D | null>(null)

  const [wrapper, setWrapper] = useState<HTMLDivElement>()
  useEffect(() => {
    if (wrapperRef.current) setWrapper(wrapperRef.current)
  }, [wrapper])

  const canvasWidth: number = useMemo(() => {
    if (!container) return 0
    return container.offsetWidth
  }, [container])

  startScrollY = useMemo(() => {
    if (startScrollY) return startScrollY
    if (!wrapper) return startScrollY

    let prevElementSibling: Element | null = wrapper.previousElementSibling
    let totalHeight = 0

    while (prevElementSibling) {
      totalHeight += prevElementSibling.clientHeight
      prevElementSibling = prevElementSibling.previousElementSibling
    }

    return totalHeight
  }, [startScrollY, wrapper])

  endScrollY = useMemo(() => {
    if (endScrollY) return endScrollY
    if (!wrapper) return endScrollY

    let prevElementSibling: Element | null = wrapper.previousElementSibling
    let totalHeight = 0

    while (prevElementSibling) {
      totalHeight += prevElementSibling.clientHeight
      prevElementSibling = prevElementSibling.previousElementSibling
    }

    return totalHeight + canvasHeight
  }, [canvasHeight, endScrollY, wrapper])

  useEffect(() => {
    if (!canvasRef.current) return
    setCanvasContext(canvasRef.current.getContext('2d'))
  }, [canvasRef])

  const currentFrameIndex = useCallback(() => {
    if (!container || !startScrollY) return 0

    const standardHeight: number = canvasHeight / imagesURLs.length
    const index = Math.floor(
      (container.scrollTop - startScrollY) / standardHeight
    )
    if (index < 0) return 0
    if (!imagesURLs[index]) return imagesURLs.length - 1

    return index
  }, [canvasHeight, container, imagesURLs, startScrollY])

  const render = useCallback(() => {
    if (!canvasContext || !canvasWidth) return
    const frameIndex = currentFrameIndex()
    const image = new Image()
    image.src = imagesURLs[frameIndex]
    canvasContext.drawImage(image, 0, 0, canvasWidth, canvasHeight)
  }, [canvasContext, canvasHeight, canvasWidth, currentFrameIndex, imagesURLs])

  useEffect(() => {
    function onScrollHandler(): void {
      requestAnimationFrame(render)
    }

    if (container) container.addEventListener('scroll', onScrollHandler)

    return () => {
      if (container) container.removeEventListener('scroll', onScrollHandler)
    }
  }, [container, render])

  useWindowResizeHandler(() => requestAnimationFrame(render))

  useImagePreload(imagesURLs)

  useEffect(() => {
    if (!canvasContext || !imagesURLs?.length || !canvasWidth || !canvasHeight)
      return

    const imageElement: HTMLImageElement = new Image()
    imageElement.src = imagesURLs[0]
    imageElement.onload = () => {
      canvasContext.drawImage(
        imageElement,
        0,
        0,
        canvasWidth as number,
        canvasHeight
      )
    }
  }, [canvasContext, imagesURLs, canvasWidth, canvasHeight])

  return (
    <Wrapper height={wrapperHeight} ref={wrapperRef}>
      <StyledCanvas
        top={topPadding}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></StyledCanvas>
    </Wrapper>
  )
}

export default ScrollSequenceAnimation
