'use client'

import { createGlobalStyle } from 'styled-components'

import reset from './reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  body {

  }

	h1 {
		font-size: 3.2rem;
		font-weight: 700;
	}
	h2 {
		font-size: 2.4rem;
		font-weight: 700;
	}
	h3 {
		font-size: 1.8rem;
		font-weight: 500;
	}

	h4 {
		font-size: 1.6rem;
		font-weight: 500;
	}
	h5 {
		font-size: 1.4rem;
		font-weight: 400;
	}

  /* font family */
  @font-face {
    font-family: "SpoqaHanSansNeoBold";
    font-weight: 700;
    src: url("../../../../resources/SpoqaHanSansNeo-Bold.woff") format("truetype");
  }
  @font-face {
    font-family: "SpoqaHanSansNeoMedium";
    font-weight: 500;
    src: url("../../../../resources/SpoqaHanSansNeo-Medium.woff") format("truetype");
  }
  @font-face {
    font-family: "SpoqaHanSansNeoRegular";
    font-weight: 400;
    src: url("../../../../resources/SpoqaHanSansNeo-Regular.woff") format("truetype");
  }
  @font-face {
    font-family: "SpoqaHanSansNeoLight";
    font-weight: 300;
    src: url("../../../../resources/SpoqaHanSansNeo-Light.woff") format("truetype");
  }
`
