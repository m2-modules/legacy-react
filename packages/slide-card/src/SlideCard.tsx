import {
  IViewPartProps,
  SlideCardProps,
  SlideDirectionType,
} from './interfaces'
import React, { RefObject, createRef, useEffect, useState } from 'react'

import CardIndicator from './CardIndicator'
import registerScrollStopHandler from './utils/register-scroll-stop-handler'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
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
  const indicator: boolean = props.indicator || true
  const indicatorColor: string | undefined = props.indicatorColor

  const children: JSX.Element[] = props.children

  const containerRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>()
  const [scrollable, setScrollable] = useState<boolean>(false)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current
    if (!container) throw new Error('Failed to find container')

    registerScrollStopHandler(container, () => {
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

      setCurrentCardIndex(cardIndex)
    })
  }, [direction, containerRef, setCurrentCardIndex])

  useEffect(() => {
    const container: HTMLDivElement | null = containerRef.current
    if (!container) throw new Error('Failed to find container')

    if (direction === 'horizontal') {
      setScrollable(container.scrollWidth > container.clientWidth)
    } else {
      setScrollable(container.scrollHeight > container.clientHeight)
    }
  }, [direction, containerRef, setScrollable])

  return (
    <Wrapper>
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
