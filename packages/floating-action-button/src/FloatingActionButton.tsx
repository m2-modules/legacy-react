import React, { useState } from 'react'

import styled from 'styled-components'

import useScroll from './hooks/UseScroll'
import {
  AutoHideOptions,
  ButtonPosition,
  FloatingActionButtonProps,
} from './interfaces'

const FloatingButton = styled.button<{
  buttonMargin: string
  hideButton: boolean
  animation: boolean
}>`
  background-color: transparent;
  border: none;
  position: fixed;
  bottom: ${(props) => props.buttonMargin};

  opacity: ${(props) => (props.hideButton ? 0 : 1)};
  transition: ${(props) => (props.animation ? 'opacity 0.1s' : 'none')};

  &.right-bottom-corner {
    right: ${(props) => props.buttonMargin};
  }

  &.left-bottom-corner {
    left: ${(props) => props.buttonMargin};
  }
`

let timeout: NodeJS.Timeout

const FloatingActionButton = ({
  position = ButtonPosition.RightBottomCorner,
  buttonMargin = '10px',
  autoHideOptions,
  children,
}: FloatingActionButtonProps): JSX.Element => {
  const [hideButton, setHideButton] = useState<boolean>(
    autoHideOptions !== undefined
  )

  useScroll(autoHideOptions?.containerRef, () => {
    if (!autoHideOptions) return
    const { timer = 1 }: AutoHideOptions = autoHideOptions

    if (hideButton) setHideButton(false)

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setHideButton(true)
    }, timer * 1000)
  })

  return (
    <FloatingButton
      className={position}
      buttonMargin={buttonMargin}
      hideButton={hideButton}
      animation={autoHideOptions?.animation || false}
    >
      {children}
    </FloatingButton>
  )
}

export default FloatingActionButton
