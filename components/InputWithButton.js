import React, { useRef } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  outline: none;
  align-self: center;
  text-align: center;
  background-color: transparent;
  border: none;
  border-bottom: rgba(255, 255, 255) solid 2px;
  color: white;
  font-size: 18px;
  width: 100%;
`

const Button = styled.button`
  margin-top: 25px;
  outline: none;
  background: white;
  font-weight: 600;
  width: 100%;
  height: 50px;
  color: black;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(119, 119, 119);
  }
`

const InputContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  margin: 18px;
  width: 200px;
  position: relative;
`

const InputWithButton = ({ visible, onSubmit, placeholder }) => {
  const input = useRef(null)
  if (!visible) {
    return null
  }

  return (
    <InputContainer>
      <Input
        ref={input}
        placeholder={placeholder}
        onKeyDown={e => e.key === 'Enter' && onSubmit(input.current.value)}
      />
      <Button onClick={() => onSubmit(input.current.value)}>GO!</Button>
    </InputContainer>
  )
}

export default InputWithButton
