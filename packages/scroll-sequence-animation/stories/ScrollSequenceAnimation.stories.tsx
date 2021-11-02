import React, { RefObject, useEffect, useRef, useState } from 'react'

import { ComponentMeta } from '@storybook/react'
import ScrollSequenceAnimation from '../src/ScrollSequenceAnimation'
import styled from 'styled-components'

export default {
  title: 'ScrollSequenceAnimation',
  component: ScrollSequenceAnimation,
} as ComponentMeta<typeof ScrollSequenceAnimation>

const Container = styled.div`
  overflow: auto;
  width: 80vw;
  height: 100%;
  background-color: rgba(250, 32, 74, 1);
`

const BeginContent = styled.div`
  height: 1200px;
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(250, 32, 74, 1) 50%,
    rgba(250, 32, 74, 1) 100%
  );
`

const EndContent = styled.div`
  height: 1200px;
  background: linear-gradient(
    180deg,
    rgba(250, 32, 74, 1) 0%,
    rgba(250, 32, 74, 1) 50%,
    rgba(2, 0, 36, 1) 100%
  );
`

export const Basic = (): JSX.Element => {
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  const [canvasHeight, setCanvasHeight] = useState<number>()

  useEffect(() => {
    if (!containerRef.current) return

    const container: HTMLDivElement = containerRef.current
    setCanvasHeight((container.offsetWidth / 3) * 2)
  }, [containerRef])

  const imageURLs = Array(121)
    .fill('')
    .map(
      (_, idx) =>
        `https://code-logs.github.io/examples/scroll-sequence-animation/images/${String(
          idx + 1
        ).padStart(3, '0')}.png`
    )

  return (
    <Container ref={containerRef}>
      <BeginContent />
      <ScrollSequenceAnimation
        container={containerRef.current}
        imagesURLs={imageURLs}
        canvasHeight={canvasHeight}
        wrapperHeight={2400}
        topPadding={'-20px'}
      />
      <EndContent />
    </Container>
  )
}
