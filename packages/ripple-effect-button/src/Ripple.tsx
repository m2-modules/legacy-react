import React from 'react'
import styled from 'styled-components'

interface StyledRippleProps {
  rippleColor?: string
}

const StyledRipple = styled.div<StyledRippleProps>`
  background: ${(props) => props.rippleColor ?? 'rgba(0, 0, 0, 0.5)'};

  width: 10px;
  height: 10px;
  border-radius: 9999px;
  position: absolute;

  animation: 0.9s forwards ripple-effect;
  @keyframes ripple-effect {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    80% {
      transform: scale(50);
    }
    100% {
      opacity: 0;
    }
  }
`

const Ripple = (props: Props): JSX.Element => {
  const { onAnimationEnd, coords, rippleColor } = props

  return (
    <StyledRipple
      rippleColor={rippleColor}
      onAnimationEnd={onAnimationEnd}
      style={{
        left: coords.x,
        top: coords.y,
      }}
    />
  )
}

interface Props {
  onAnimationEnd: React.AnimationEventHandler
  coords: {
    x: number
    y: number
  }
  rippleColor?: string
}

export default Ripple
