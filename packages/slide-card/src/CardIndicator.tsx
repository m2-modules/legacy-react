import {
  CardIndicatorProps,
  ICircleProps,
  SlideDirectionType,
} from './interfaces'

import React from 'react'
import styled from 'styled-components'

const IndicatorContainer = styled.div`
  position: absolute;
  display: inline-flex;
  gap: 5px;
  bottom: 10px;

  &.horizontal {
    flex-direction: row;
    left: 50%;
    transform: translateX(-50%);
  }

  &.vertical {
    flex-direction: column;
    right: 10px;
  }
`

const Circle = styled.span<ICircleProps>`
  border: 3px solid ${(props) => props.indicatorColor};
  background-color: ${(props) =>
    props.active ? props.indicatorColor : 'transparent'};
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  box-shadow: 2px 2px 2px #333;
`

const CardIndicator = (props: CardIndicatorProps): JSX.Element => {
  const cardCount: number = props.cardCount
  const currentCardIndex: number = props.currentCardIndex
  const indicatorColor: string = props.indicatorColor || 'white'
  const direction: SlideDirectionType = props.direction

  return (
    <IndicatorContainer className={direction}>
      {Array(cardCount)
        .fill('')
        .map((_, idx: number) => (
          <Circle
            key={idx}
            active={idx === currentCardIndex}
            indicatorColor={indicatorColor}
          />
        ))}
    </IndicatorContainer>
  )
}

export default CardIndicator
