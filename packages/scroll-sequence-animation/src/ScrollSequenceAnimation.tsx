import React, { RefObject, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import useImagePreload from './hooks/use-image-preload'
import useWindowResizeHandler from './hooks/use-window-resize-handler'
import ScrollSequenceAnimationProps from './interfaces'

const Wrapper = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`

const StyledCanvas = styled.canvas`
  position: sticky;

  &.middle {
    top: 50%;
    transform: translateY(-50%);
  }

  &.top {
    top: 0px;
  }

  &.bottom {
    top: 100%;
    transform: translateY(-100%);
  }
`

const ScrollSequenceAnimation = ({
  containerRef,
  imagesURLs,
  heightRatio,
  wrapperHeight,
  startScrollY,
  endScrollY,
  verticalAlign = 'middle',
}: ScrollSequenceAnimationProps): JSX.Element => {
  const wrapperRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(
    null
  )

  const [
    canvasContext,
    setCanvasContext,
  ] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  const [canvasHeight, setCanvasHeight] = useState<number>(0)
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0)

  const [container, setContainer] = useState<Element | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    setContainer(containerRef.current)
  }, [containerRef])

  const [startY, setStartY] = useState<number | undefined>(startScrollY)
  const [endY, setEndY] = useState<number | undefined>(endScrollY)

  // Set startY
  useEffect(() => {
    if (startScrollY || !wrapperRef.current) return

    let prevSibling: Element | null = wrapperRef.current.previousElementSibling
    let totalHeight = 0
    while (prevSibling) {
      totalHeight += prevSibling.clientHeight
      prevSibling = prevSibling.previousElementSibling
    }

    setStartY(totalHeight)
  }, [wrapperRef, startScrollY])

  // Set endY
  useEffect(() => {
    if (endScrollY || !wrapperRef.current || !canvasHeight) return

    let prevSibling: Element | null = wrapperRef.current.previousElementSibling
    let totalHeight = 0
    while (prevSibling) {
      totalHeight += prevSibling.clientHeight
      prevSibling = prevSibling.previousElementSibling
    }

    setEndY(totalHeight + canvasHeight)
  }, [wrapperRef, endScrollY, canvasHeight])

  // Preloading images
  useImagePreload(imagesURLs)

  // Set canvas width
  useEffect(() => {
    if (!container) return
    setCanvasWidth(container.clientWidth)
  }, [container])

  // Set canvas height
  useEffect(() => {
    if (!canvasWidth || !heightRatio) return
    setCanvasHeight(canvasWidth * heightRatio)
  }, [canvasWidth, heightRatio])

  // Set canvas context
  useEffect(() => {
    if (!canvasRef.current) return
    setCanvasContext(canvasRef.current.getContext('2d'))
  }, [canvasRef])

  // Draw image
  useEffect(() => {
    if (!canvasContext || !canvasWidth || !canvasHeight) return

    const imageElement: HTMLImageElement = new Image()
    imageElement.onload = () => {
      requestAnimationFrame(() => {
        canvasContext.drawImage(imageElement, 0, 0, canvasWidth, canvasHeight)
      })
    }
    console.log(currentFrameIndex)
    imageElement.src = imagesURLs[currentFrameIndex]
  }, [canvasContext, canvasHeight, canvasWidth, currentFrameIndex, imagesURLs])

  // Add scroll event listener
  useEffect(() => {
    if (!container) return

    const onScrollHandler = () => {
      if (startY === undefined || endY === undefined) return

      const standardHeight = (endY - startY) / imagesURLs.length
      let index: number = Math.floor(
        (container.scrollTop - startY) / standardHeight
      )
      if (index < 0) index = 0
      if (!imagesURLs[index]) index = imagesURLs.length - 1

      setCurrentFrameIndex(index)
    }

    container.addEventListener('scroll', onScrollHandler)
    return () => container.removeEventListener('scroll', onScrollHandler)
  }, [container, imagesURLs, startY, endY])

  useWindowResizeHandler(() => {
    if (!container) return
    setCanvasWidth(container.clientWidth)
    setCanvasHeight(canvasWidth * heightRatio)
  })

  return (
    <Wrapper height={wrapperHeight} ref={wrapperRef}>
      <StyledCanvas
        className={verticalAlign}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      ></StyledCanvas>
    </Wrapper>
  )
}

export default ScrollSequenceAnimation
