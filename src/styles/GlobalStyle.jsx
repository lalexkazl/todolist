import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import-normalize;
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.family};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fwLight};
    background-color: ${({ theme }) => theme.colors.bg};
  }

  :root {
    --family: ${({ theme }) => theme.family};
    --fs-sm: ${({ theme }) => theme.fsSm};
    --fs-md: ${({ theme }) => theme.fsMd};
    --fw-light: ${({ theme }) => theme.fwLight};
    --fw-normal: ${({ theme }) => theme.fwNormal};
    --fw-bold: ${({ theme }) => theme.fwBold};
    --radii: ${({ theme }) => theme.radii};
    --colors-text: ${({ theme }) => theme.colors.text};
    --colors-bg: ${({ theme }) => theme.colors.bg};
    --colors-ui-base: ${({ theme }) => theme.colors.uiBase};
    --colors-ui-header: ${({ theme }) => theme.colors.uiHeader};
    --colors-accent: ${({ theme }) => theme.colors.accent};
    --shadow: ${({ theme }) => theme.shadow};
    --delete-color: #800000;
  }
`;
