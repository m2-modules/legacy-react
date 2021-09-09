import React from 'react'

import styled from 'styled-components'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { SubButton } from '../interfaces'

const InlineFlexDiv = styled.div`
  display: inline-flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  border: 1px solid black;
  border-radius: 5px;
  height: ${(props: { height?: string }) => props.height || '30px'};
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: transparent;
`

const MoreButton = styled(Button)`
  border-inline-start: 1px solid black;
`

const StyledMoreHorizIcon = styled(MoreHorizIcon)`
  font-size: ${(props) => props.fontSize || 'small'};
`

export declare type MultiActionButtonPropsType = {
  name: string
  action: (...args: any) => any
  subButtons?: SubButton[]
}

const MultiActionButton = (props: MultiActionButtonPropsType): JSX.Element => {
  const { name, action, subButtons } = props

  const openSubButtons = () => {}

  return (
    <InlineFlexDiv>
      <Button onClick={action}>{name}</Button>
      {subButtons?.length ? (
        <>
          <MoreButton onClick={openSubButtons}>
            <StyledMoreHorizIcon fontSize="small" />
          </MoreButton>

          <InlineFlexDiv flexDirection="column">
            {subButtons.map((subAction: SubButton, idx: number) => (
              <Button key={`sub-button-${idx}`} onClick={subAction.action}>
                {subAction.name}
              </Button>
            ))}
          </InlineFlexDiv>
        </>
      ) : (
        ''
      )}
    </InlineFlexDiv>
  )
}

export default MultiActionButton
