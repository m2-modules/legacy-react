import React from 'react'
import styled from 'styled-components';
// interfaces
import { IStyledLabel, IStyledSpan, FloatingLabelInputProps } from './interfaces';

const StyledLabel = styled.label<IStyledLabel>`
  padding-top: 12px;
  position: relative;

  &:before {
    border-bottom: 1px solid #777;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
  }

  &:after {
    border-bottom: 2px solid ${props => 
      props.underlineColor ? props.underlineColor : 'black'
    };
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;

    transform: ${props => props.focus ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform ease-out 0.2s;
  }

  & > * {
    padding: 10px;
  }
`;

const StyledSpan = styled.span<IStyledSpan>`
  font-size: 0.9em;
  pointer-events: none;
  width: fill-available;
  color: #777;
  position: absolute;
  transition: font-size ease-out 0.1s,
    margin-top ease-out 0.1s;
  font-size: ${props => props.focus && '0.8em'};
  margin-top: ${props => props.focus&& '-20px'};
`;

const StyledInput = styled.input`
  width: fill-available;
  border: none;
  outline: none;

`;

const FloatingLabelInput = (props: FloatingLabelInputProps): JSX.Element => {
  const { label, underlineColor, value, onChange, ...rest } = props;
  
  const [focus, setFocus] = React.useState(false);

  const onBlur = () => {
    if (value === '') {
      setFocus(false);
    }
  };

  return (
    <StyledLabel focus={focus} underlineColor={underlineColor} {...rest}>
    <StyledSpan focus={focus}>{label}</StyledSpan>
      <StyledInput
        onFocus={() => setFocus(true)}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </StyledLabel>  
  );
}

export default FloatingLabelInput;
