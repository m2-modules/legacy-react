import React from 'react'
import styled from 'styled-components'
// interfaces
import { StyledLabelProps, UnderlineRadioButtonProps } from './interfaces'

const StyledContainer = styled.div``

const StyledLabel = styled.label<StyledLabelProps>`
  padding: 5px;
  position: relative;
  cursor: pointer;

  &:before {
    border-bottom: 1px solid #777777;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:after {
    border-bottom: 2px solid ${(props) => props.underlineColor ?? 'black'};
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;

    transform: ${(props) => (props.checked ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform ease-out 0.2s;
  }
`

const StyledRadio = styled.input`
  display: none; // disable default radio button
`

const UnderlineRadioButton = (
  props: UnderlineRadioButtonProps
): JSX.Element => {
  const { value, name, onChangeRadio, underlineColor, ...rest } = props

  const [checked, setChecked] = React.useState<string>('')

  const onClick = (event: React.MouseEvent) => {
    const $target = event.target as HTMLInputElement

    if ($target.tagName === 'INPUT') {
      setChecked($target.value)
      onChangeRadio && onChangeRadio($target.value)
    }
  }

  return (
    <StyledContainer onClick={onClick}>
      {value.map((each) => (
        <StyledLabel
          key={each.display}
          checked={each.value === checked}
          underlineColor={underlineColor}
          {...rest}
        >
          <StyledRadio
            name={name}
            value={each.value}
            checked={each.value === checked}
          />
          {each.display ?? each.value}
        </StyledLabel>
      ))}
    </StyledContainer>
  )
}

export default UnderlineRadioButton
