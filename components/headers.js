import styled from 'styled-components'
import { width } from './theme'

const BaseHeader = styled.h1`
  font-weight: 600;
  font-size: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
  @media (max-width: ${width.desktop}px) {
    font-size: 80px;
  }
  @media (max-width: ${width.tablet}px) {
    font-size: 60px;
  }
  @media (max-width: ${width.phone}px) {
    font-size: 30px;
  }
`

export const MainHeader = styled(BaseHeader)`
  align-self: flex-start;
  padding-left: 20px;
`

export const SmallHeader = styled(BaseHeader)`
  font-size: 80px;
  text-align: center;
`
