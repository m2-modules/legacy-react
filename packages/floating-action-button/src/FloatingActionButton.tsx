import { ButtonPosition, FloatingActionButtonProps } from './interfaces'

import React from 'react'
import styled from 'styled-components'

const FloatingButton = styled.button<{ buttonMargin: string }>`
  background-color: transparent;
  border: none;
  position: fixed;
  bottom: ${(props) => props.buttonMargin};

  &.right-bottom-corner {
    right: ${(props) => props.buttonMargin};
  }

  &.left-bottom-corner {
    left: ${(props) => props.buttonMargin};
  }
`

const FloatingActionButton = ({
  position = ButtonPosition.RightBottomCorner,
  buttonMargin = '10px',
  children,
  onClick,
}: FloatingActionButtonProps): JSX.Element => {
  return (
    <FloatingButton
      className={position}
      buttonMargin={buttonMargin}
      onClick={onClick}
    >
      {children}
    </FloatingButton>
  )
}

export default FloatingActionButton
