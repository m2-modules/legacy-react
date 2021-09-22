import {
  DrawPanelPositionTypes,
  IDrawPanelProps,
  IStyledDrawPanelContainer,
  IStyledModal,
} from './interfaces'

import React from 'react'
import styled from 'styled-components'

const StyledModal = styled.div<IStyledModal>`
  opacity: 0%;
  display: flex;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 9;
  background-color: ${(props) => props.backgroundColor};
  transition: opacity 0.5s;
  &[open] {
    opacity: 100%;
  }
`

const StyledDrawPanelContainer = styled.div<IStyledDrawPanelContainer>`
  position: fixed;
  background-color: ${(props) => props.backgroundColor};
  transition: transform 0.5s;
  z-index: 10;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  &.left {
    right: auto;
    transform: translateX(-100%);
  }
  &.right {
    left: auto;
    transform: translateX(100%);
  }
  &.top {
    bottom: auto;
    transform: translateY(-100%);
  }
  &.bottom {
    top: auto;
    transform: translateY(100%);
  }
  &[open] {
    transform: translate(0%, 0%);
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
    <>
      <StyledModal
        backgroundColor={modalColor}
        open={open}
        onClick={closeHandler}
      ></StyledModal>
      <StyledDrawPanelContainer
        className={position}
        backgroundColor={panelColor}
        open={open}
      >
        {children}
      </StyledDrawPanelContainer>
    </>
  )
}

export default DrawPanel
