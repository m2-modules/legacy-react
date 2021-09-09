import MoreHorizontalIcon from '@material-ui/icons/MoreHoriz'
import React from 'react'
import { SubButton } from '../interfaces'
import styled from 'styled-components'

const InlineFlexDiv = styled.div`
  display: inline-flex;
  border: 1px solid black;
  border-radius: 5px;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  border: none;
  background-color: transparent;
  height: ${(props: { height?: string }) => props.height || '30px'};
  box-sizing: border-box;
`

const MoreButton = styled(Button)`
  border-inline-start: 1px solid black;
  position: relative;
  & > div.sub-button-container {
    opacity: 0;
  }
  &:focus > div.sub-button-container {
    opacity: 1;
  }
`

const StyledMoreHorizontalIcon = styled(MoreHorizontalIcon)`
  font-size: ${(props) => props.fontSize || 'small'};
`

const SubButtonContainerDiv = styled(InlineFlexDiv)`
  flex-direction: column;
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0px;
  height: fit-content;
  width: max-content;
  &:focus {
    opacity: 1 !important;
  }
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
            <StyledMoreHorizontalIcon fontSize="small" />

            <SubButtonContainerDiv className="sub-button-container">
              {subButtons.map((subAction: SubButton, idx: number) => (
                <Button key={`sub-button-${idx}`} onClick={subAction.action}>
                  {subAction.name}
                </Button>
              ))}
            </SubButtonContainerDiv>
          </MoreButton>
        </>
      ) : (
        ''
      )}
    </InlineFlexDiv>
  )
}

export default MultiActionButton
