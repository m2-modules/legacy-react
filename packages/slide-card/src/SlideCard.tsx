import {
  AutoTravel,
  IViewPartProps,
  IWrapperProps,
  SlideCardProps,
  SlideDirectionType,
} from './interfaces'
import React, {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useState,
} from 'react'

import CardIndicator from './CardIndicator'
import styled from 'styled-components'
import useScrollStop from './hooks/UseScrollStop'

const Wrapper = styled.div<IWrapperProps>`
  position: relative;
  width: ${(props) => props.width || '100vw'};
  height: ${(props) => props.height || '100vh'};
`

const ViewPart = styled.div<IViewPartProps>`
  position: relative;
  flex: 1;
  display: grid;
  gap: ${(props) => `${props.cardGap}px`};
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
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
  const cardGap: number = props.cardGap || 10
  const [travelDirection, setTravelDirection] = useState<
    'forward' | 'backward'
  >('forward')

  const moveScroll = useCallback(
    (left: number, top: number) => {
      if (!containerRef.current)
        throw new Error('Failed to find target contianer')
      const container: HTMLDivElement = containerRef.current

      container.scrollTo({ left, top, behavior: 'smooth' })
    },
    [containerRef]
  )

  useEffect(() => {
    function computeTravelDirection() {
      if (!autoTravel) return
      if (currentCardIndex === 0) {
        setTravelDirection('forward')
      }

      if (AutoTravel.RoundTrip && currentCardIndex === children.length - 1) {
        setTravelDirection('backward')
      }
    }

    computeTravelDirection()
  }, [autoTravel, children.length, currentCardIndex])

  const scrollStop = useScrollStop(containerRef)
  useEffect(() => {
    function updateIndicator() {
      if (!scrollStop || !containerRef.current) return

      const container: HTMLElement = containerRef.current
      const { scrollLeft, scrollTop, clientWidth, clientHeight } = container
      let cardIndex: number
      if (direction === 'horizontal') {
        if (container.scrollLeft <= 0) {
          cardIndex = 0
        } else {
          const unitWidth = clientWidth + cardGap
          cardIndex = Math.ceil(scrollLeft / unitWidth)
        }
      } else {
        if (container.scrollTop <= 0) {
          cardIndex = 0
        } else {
          const unitHeight = clientHeight + cardGap
          cardIndex = Math.ceil(scrollTop / unitHeight)
        }
      }

      if (currentCardIndex !== cardIndex) setCurrentCardIndex(cardIndex)
    }

    updateIndicator()
  }, [cardGap, containerRef, currentCardIndex, direction, scrollStop])

  useEffect(() => {
    function setAutoTravelInterval() {
      if (!autoTravel) return
      const interval = setInterval(() => {
        if (!containerRef.current) return

        const container: HTMLDivElement = containerRef.current
        let left = 0
        let top = 0

        if (direction === 'horizontal') {
          if (travelDirection === 'forward') {
            left = container.clientWidth * (currentCardIndex + 1)
          } else {
            left = container.clientWidth * (currentCardIndex - 1)
          }
        } else {
          if (travelDirection === 'forward') {
            top = container.clientHeight * (currentCardIndex + 1)
          } else {
            top = container.clientHeight * (currentCardIndex - 1)
          }
        }

        if (
          autoTravel === AutoTravel.OneWay &&
          currentCardIndex === children.length - 1
        ) {
          clearInterval(interval)
        } else {
          moveScroll(left, top)
        }
      }, timer * 1000)

      return interval
    }

    const interval: NodeJS.Timeout | undefined = setAutoTravelInterval()
    return () => interval && clearInterval(interval)
  }, [
    autoTravel,
    children.length,
    containerRef,
    currentCardIndex,
    direction,
    moveScroll,
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
        cardGap={cardGap}
      >
        {children.map((child: JSX.Element, idx: number) => (
          <div key={`card-item-${idx}`} className="card-item">
            {child}
          </div>
        ))}
      </ViewPart>

      {indicator && children.length ? (
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
