import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: #FAF9FA;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  .slide-box{
    border: 13px solid #162c6e;
    border-radius: 10px;
    padding: 5px;
    background: white;
    height: auto;
  }

  .card-backround-color{
    background: linear-gradient(975deg, #075486 10%, #075486 100%);
  }
  
  // slider
  .each-slide > div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    height: 350px;

    @media screen and (max-width: 768px) {
      height: 170px;
    }

    @media screen and (max-width: 560px) {
      height: 120px;
    }

  }
  
  .each-slide span {
    padding: 20px;
    font-size: 20px;
    background: #efefef;
    text-align: center;
  }
`

export default GlobalStyle
