import React, { KeyboardEvent, useCallback } from 'react'

import styled from 'styled-components'

import RippleEffectButton from '@m2-modules/ripple-effect-button'
import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz'

import { ButtonIcon, MultiActionButtonProps, SubButton } from './interfaces'

const PrimaryWrapperDiv = styled.div`
  display: inline-flex;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  &.reverse {
    direction: rtl;
  }
`

const StyledButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  &:focus {
    outline: 1px solid #aaa;
    outline-offset: -5px;
  }
`

const StyledRippleEffectButton = styled(RippleEffectButton)`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  &:focus {
    outline: 1px solid #aaa;
    outline-offset: -5px;
  }
`

const MoreButton = styled(StyledButton)`
  border-inline-start: 1px solid black;
  position: relative;
  & + ul#sub-button-wrapper {
    pointer-events: none;
    opacity: 0;
  }
  &:focus + ul#sub-button-wrapper {
    pointer-events: auto;
    opacity: 1;
  }
`

const RippleEffectMoreButton = styled(StyledRippleEffectButton)`
  border-inline-start: 1px solid black;
  position: relative;
  & + ul#sub-button-wrapper {
    pointer-events: none;
    opacity: 0;
  }
  &:focus + ul#sub-button-wrapper {
    pointer-events: auto;
    opacity: 1;
  }
`

const StyledMoreHorizontalIcon = styled(MoreHorizontalIcon)`
  font-size: ${(props) => props.fontSize || 'small'};
`

const SubButtonWrapperList = styled.ul`
  display: inline-flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  flex-direction: column;
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0px;
  height: fit-content;
  width: max-content;
  margin: 0px;
  padding: 0px;
  list-style: none;
  transition: opacity ease-in-out 0.3s;
  &.dropdown {
    bottom: auto;
    top: calc(100% + 10px);
  }
  &:focus-within {
    pointer-events: auto !important;
    opacity: 1 !important;
  }
  & > li {
    display: inline-flex;
  }
`

const SubButtonIconImage = styled.img``

const MultiActionButton = (props: MultiActionButtonProps): JSX.Element => {
  const {
    name,
    icon,
    rippleColor,
    reverse = false,
    dropdown = false,
    moreButtonIcon = <StyledMoreHorizontalIcon />,
    action,
    subButtons,
  } = props

  const moveFocus = useCallback((event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      const nextButton:
        | HTMLButtonElement
        | null
        | undefined = event.currentTarget.nextElementSibling?.querySelector(
        'button'
      )
      if (nextButton) nextButton.focus()
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      const prevButton:
        | HTMLButtonElement
        | null
        | undefined = event.currentTarget.previousElementSibling?.querySelector(
        'button'
      )
      if (prevButton) prevButton.focus()
    }
  }, [])

  const renderButtonIcon = useCallback(
    (icon: ButtonIcon | JSX.Element): JSX.Element => {
      if ('src' in icon && 'alt' in icon) {
        return <SubButtonIconImage src={icon.src} alt={icon.alt} />
      } else {
        return icon
      }
    },
    []
  )

  return (
    <PrimaryWrapperDiv className={reverse ? 'reverse' : ''}>
      {rippleColor ? (
        <>
          <StyledRippleEffectButton rippleColor={rippleColor} onClick={action}>
            {icon ? renderButtonIcon(icon) : ''}
            {name}
          </StyledRippleEffectButton>

          {subButtons?.length ? (
            <>
              <RippleEffectMoreButton rippleColor={rippleColor}>
                {renderButtonIcon(moreButtonIcon)}
              </RippleEffectMoreButton>

              <SubButtonWrapperList
                id="sub-button-wrapper"
                className={dropdown ? 'dropdown' : ''}
              >
                {subButtons.map((subButton: SubButton, idx: number) => (
                  <li key={`sub-button-${idx}`} onKeyDown={moveFocus}>
                    <StyledRippleEffectButton
                      rippleColor={rippleColor}
                      onClick={subButton.action}
                    >
                      {subButton.icon ? renderButtonIcon(subButton.icon) : ''}
                      {subButton.name}
                    </StyledRippleEffectButton>
                  </li>
                ))}
              </SubButtonWrapperList>
            </>
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <StyledButton onClick={action}>
            {icon ? renderButtonIcon(icon) : ''}
            {name}
          </StyledButton>

          {subButtons?.length ? (
            <>
              <MoreButton>{renderButtonIcon(moreButtonIcon)}</MoreButton>

              <SubButtonWrapperList
                id="sub-button-wrapper"
                className={dropdown ? 'dropdown' : ''}
              >
                {subButtons.map((subButton: SubButton, idx: number) => (
                  <li key={`sub-button-${idx}`} onKeyDown={moveFocus}>
                    <StyledButton onClick={subButton.action}>
                      {subButton.icon ? renderButtonIcon(subButton.icon) : ''}
                      {subButton.name}
                    </StyledButton>
                  </li>
                ))}
              </SubButtonWrapperList>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </PrimaryWrapperDiv>
  )
}

export default MultiActionButton
