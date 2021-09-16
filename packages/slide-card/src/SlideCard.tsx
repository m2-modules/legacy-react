import React, { useCallback, useState } from 'react'

import styled from 'styled-components'

import CardIndicator from './CardIndicator'
import {
  IViewPartProps,
  SlideCardProps,
  SlideDirectionType,
} from './interfaces'

const ViewPart = styled.div<IViewPartProps>`
  position: relative;
  flex: 1;
  display: grid;
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
  & > * {
    width: inherit;
    height: inherit;
    object-fit: none;
    scroll-snap-align: start;
    scroll-snap-stop: ${(props) => (props.fastSeeking ? 'normal' : 'always')};
  }
`

const SlideCard = (props: SlideCardProps): JSX.Element => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const onScrollHandler = useCallback(() => {
    console.log('scrolling')
  }, [])

  const width: string | undefined = props.width
  const height: string | undefined = props.height
  const direction: SlideDirectionType = props.direction || 'horizontal'
  const fastSeeking: boolean = props.fastSeeking || false
  const indicator: boolean = props.indicator || true
  const emphasizeColor: string | undefined = props.emphasizeColor

  const children: JSX.Element[] = props.children

  return (
    <ViewPart
      onScroll={onScrollHandler}
      width={width}
      height={height}
      direction={direction}
      fastSeeking={fastSeeking}
    >
      {children}

      {indicator ? (
        <CardIndicator
          cardCount={children.length}
          currentCardIndex={currentCardIndex}
          emphasizeColor={emphasizeColor}
        />
      ) : (
        ''
      )}
    </ViewPart>
  )
}

export default SlideCard
