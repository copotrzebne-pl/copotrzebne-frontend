import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html, #root {
    height: 100%;
    width: 100%;
  }
  html {
    font-size: 16px;
  }
  body {
    font-family: roboto, helvetica, arial, sans-serif;
    color: #000;
    font-size: 16px;
    height: 100%;
    width: 100%;
  }
`
