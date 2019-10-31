import { createGlobalStyle, keyframes } from 'styled-components'

export const containerBackground = 'white'
export const width = {
  desktop: 992,
  tablet: 768,
  phone: 576
}

export const fade = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Nunito Sans';
    font-weight: normal;
    src: url("/NunitoSans-Regular.ttf");
  }
  @font-face {
    font-family: 'Nunito Sans';
    font-weight: 600;
    src: url("/NunitoSans-SemiBold.ttf");
  }
  body {
    font-family: 'Nunito Sans', sans-serif;
    margin: 0;
    background-color: ${containerBackground};
  }
`
