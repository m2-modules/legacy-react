import React, { KeyboardEvent, useCallback } from 'react'

import styled from 'styled-components'

import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz'

import { ButtonIcon, SubButton } from '../interfaces'

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
  height: ${(props: { height?: string }) => props.height || '30px'};
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

export declare type MultiActionButtonPropsType = {
  name: string
  icon?: ButtonIcon
  reverse?: boolean
  dropdown?: boolean
  action: (...args: any) => any
  subButtons?: SubButton[]
}

const MultiActionButton = (props: MultiActionButtonPropsType): JSX.Element => {
  const {
    name,
    icon,
    reverse = false,
    dropdown = false,
    action,
    subButtons,
  } = props

  const moveFocus = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      const nextButton:
        | HTMLButtonElement
        | null
        | undefined = event.currentTarget.parentElement?.nextElementSibling?.querySelector(
        'button'
      )
      if (nextButton) nextButton.focus()
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      const prevButton:
        | HTMLButtonElement
        | null
        | undefined = event.currentTarget.parentElement?.previousElementSibling?.querySelector(
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
      <StyledButton onClick={action}>
        {icon ? renderButtonIcon(icon) : ''}
        {name}
      </StyledButton>
      {subButtons?.length ? (
        <>
          <MoreButton>
            <StyledMoreHorizontalIcon fontSize="small" />
          </MoreButton>

          <SubButtonWrapperList
            id="sub-button-wrapper"
            className={dropdown ? 'dropdown' : ''}
          >
            {subButtons.map((subButton: SubButton, idx: number) => (
              <li key={`sub-button-${idx}`}>
                <StyledButton onClick={subButton.action} onKeyDown={moveFocus}>
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
    </PrimaryWrapperDiv>
  )
}

export default MultiActionButton
