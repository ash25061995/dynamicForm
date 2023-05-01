import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
    body{
        display: grid;
        place-items: center;
        height: 100vh;
        background-image: ${({theme}) => theme.color.gradientColor};
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyles;