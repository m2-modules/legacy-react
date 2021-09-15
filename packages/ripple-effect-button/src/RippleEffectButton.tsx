import React from 'react'
import styled from 'styled-components'
// components
import Ripple from './Ripple'

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;

  padding: 10px;
  background-color: white;
  cursor: pointer;
`

const RippleEffectButton = (props: RippleEffectButtonProps): JSX.Element => {
  const { children, onClick, rippleColor, ...rest } = props

  const [rippleKey, setRippleKey] = React.useState(0)
  const [ripples, setRipples] = React.useState<RippleValues>({})

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const makeRipples = (event: React.MouseEvent) => {
    const $target = buttonRef.current as HTMLButtonElement
    const rect = $target.getBoundingClientRect()

    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    // work on Keyboard Click (Enter, Spacebar)
    if (event.clientX === 0 && event.clientY === 0) {
      x = $target.clientWidth / 2
      y = $target.clientHeight / 2
    }

    setRipples((prevState) => {
      return { ...prevState, [rippleKey]: { x, y } }
    })
    setRippleKey((prevState) => prevState + 1)
  }

  const deleteRipple = (event: React.AnimationEvent, key: string) => {
    if (event.animationName === 'ripple-effect') {
      const newRipples = Object.assign({}, ripples)
      delete newRipples[key] // delete Component when animation end
      setRipples(newRipples)
    }
  }

  return (
    <StyledButton
      ref={buttonRef}
      onClick={(event) => {
        makeRipples(event)
        onClick && onClick(event)
      }}
      {...rest}
    >
      {children}
      {Object.keys(ripples).map((each) => {
        return (
          <Ripple
            key={each}
            rippleColor={rippleColor}
            onAnimationEnd={(event) => deleteRipple(event, each)}
            coords={ripples[each]}
          />
        )
      })}
    </StyledButton>
  )
}

export interface RippleEffectButtonProps {
  children: React.ReactNode
  onClick?: React.MouseEventHandler
  rippleColor?: string
}

type RippleValues = {
  [key: string]: {
    x: number
    y: number
  }
}

export default RippleEffectButton
