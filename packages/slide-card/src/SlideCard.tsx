import React, { createRef, RefObject, useEffect, useState } from 'react'

import styled from 'styled-components'

import CardIndicator from './CardIndicator'
import useScrollStop from './hooks/UseScrollStop'
import {
  AutoTravel,
  IViewPartProps,
  IWrapperProps,
  SlideCardProps,
  SlideDirectionType,
} from './interfaces'

const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
`

const ViewPart = styled.div<IViewPartProps>`
  position: relative;
  flex: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  grid-auto-flow: ${(props) =>
    props.direction === 'horizontal' ? 'column' : 'row'};
  overflow-x: auto;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
  scroll-snap-type: ${(props) => (props.direction === 'horizontal' ? 'x' : 'y')}
    mandatory;
  &::-webkit-scrollbar {
    display: none;
  }
  & > .card-item {
    width: inherit;
    height: inherit;
    scroll-snap-align: start;
    scroll-snap-stop: ${(props) => (props.fastSeeking ? 'normal' : 'always')};
  }
`

const SlideCard = (props: SlideCardProps): JSX.Element => {
  const width: string | undefined = props.width
  const height: string | undefined = props.height
  const direction: SlideDirectionType = props.direction || 'horizontal'
  const fastSeeking: boolean = props.fastSeeking || false
  const indicator: boolean = props.indicator ?? true
  const indicatorColor: string | undefined = props.indicatorColor

  const autoTravel: AutoTravel | undefined = props.autoTravel
  const timer: number = props.timer || 3

  const children: JSX.Element[] = props.children

  const containerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
  const [scrollable, setScrollable] = useState<boolean>(false)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const [travelDirection, setTravelDirection] = useState<
    'forward' | 'backward'
  >('forward')
  useEffect(() => {
    if (currentCardIndex === 0) return setTravelDirection('forward')
    if (
      autoTravel === AutoTravel.RoundTrip &&
      currentCardIndex === children.length - 1
    )
      return setTravelDirection('backward')
  }, [autoTravel, children.length, currentCardIndex])

  const scrollStop = useScrollStop(containerRef)
  useEffect(() => {
    if (!scrollStop || !containerRef.current) return

    const container: HTMLElement = containerRef.current
    let cardIndex: number
    if (direction === 'horizontal') {
      if (container.scrollLeft <= 0) {
        cardIndex = 0
      } else {
        cardIndex = Math.round(container.scrollLeft / container.clientWidth)
      }
    } else {
      if (container.scrollTop <= 0) {
        cardIndex = 0
      } else {
        cardIndex = Math.round(container.scrollTop / container.clientHeight)
      }
    }

    if (currentCardIndex !== cardIndex) setCurrentCardIndex(cardIndex)
  }, [containerRef, currentCardIndex, direction, scrollStop])

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current
    if (!container) throw new Error('Failed to find container')

    if (direction === 'horizontal') {
      setScrollable(container.scrollWidth > container.clientWidth)
    } else {
      setScrollable(container.scrollHeight > container.clientHeight)
    }
  }, [direction, containerRef, setScrollable])

  useEffect(() => {
    if (!autoTravel) return
    const interval: NodeJS.Timeout = setInterval(() => {
      if (!containerRef.current) return

      const container: HTMLDivElement = containerRef.current
      if (direction === 'horizontal') {
        if (travelDirection === 'forward') {
          container.scrollTo({
            left: container.clientWidth * (currentCardIndex + 1),
            top: 0,
            behavior: 'smooth',
          })
        } else {
          container.scrollTo({
            left: container.clientWidth * (currentCardIndex - 1),
            top: 0,
            behavior: 'smooth',
          })
        }
      } else {
        if (travelDirection === 'forward') {
          container.scrollTo({
            left: 0,
            top: container.clientHeight * (currentCardIndex + 1),
            behavior: 'smooth',
          })
        } else {
          container.scrollTo({
            left: 0,
            top: container.clientHeight * (currentCardIndex - 1),
            behavior: 'smooth',
          })
        }
      }
    }, timer * 1000)

    return () => clearInterval(interval)
  }, [
    autoTravel,
    children.length,
    containerRef,
    currentCardIndex,
    direction,
    timer,
    travelDirection,
  ])

  return (
    <Wrapper width={width} height={height}>
      <ViewPart
        ref={containerRef}
        width={width}
        height={height}
        direction={direction}
        fastSeeking={fastSeeking}
      >
        {children.map((child: JSX.Element, idx: number) => (
          <div key={`card-item-${idx}`} className="card-item">
            {child}
          </div>
        ))}
      </ViewPart>

      {indicator && scrollable ? (
        <CardIndicator
          cardCount={children.length}
          currentCardIndex={currentCardIndex}
          indicatorColor={indicatorColor}
          direction={direction}
        />
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default SlideCard
