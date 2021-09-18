import React from 'react'

import styled from 'styled-components'

import {
  DrawPanelPositionTypes,
  IDrawPanelProps,
  IStyledDrawPanelContainer,
  IStyledModal,
} from './interfaces'

const StyledModal = styled.div<IStyledModal>`
  display: flex;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 9;
  background-color: ${(props) => props.backgroundColor};
`

const StyledDrawPanelContainer = styled.div<IStyledDrawPanelContainer>`
  position: fixed;
  background-color: ${(props) => props.backgroundColor};
  z-index: 10;
  &.left {
    left: 0px;
    top: 0px;
    bottom: 0px;
  }
  &.right {
    right: 0px;
    top: 0px;
    bottom: 0px;
  }
  &.top {
    top: 0px;
    left: 0px;
    right: 0px;
  }
  &.bottom {
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
`

const DrawPanel = (props: IDrawPanelProps): JSX.Element => {
  const position: DrawPanelPositionTypes = props.position || 'left'
  const modalColor: string = props.modalColor || 'rgba(0, 0, 0, 0.3)'
  const panelColor: string = props.panelColor || 'white'
  const open: boolean = props.open ?? false
  const closeHandler: () => void = props.closeHandler
  const children: JSX.Element[] = props.children

  return (
    <StyledModal
      backgroundColor={modalColor}
      open={open}
      onClick={closeHandler}
    >
      <StyledDrawPanelContainer
        className={position}
        backgroundColor={panelColor}
        open={open}
      >
        {children}
      </StyledDrawPanelContainer>
    </StyledModal>
  )
}

export default DrawPanel
