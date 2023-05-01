import FormFields from './components/DynamicForm/DynamicForm';
import {ThemeProvider} from 'styled-components'
import GlobalStyles from './styles/globalStyles/globalStyles';
import React from 'react';

const theme = {
  color : {
    primary: 'blue',
    secondary: 'green',
    gradientColor: 'radial-gradient(circle at center, #6c5ce7, #b550e7)'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <FormFields/>
    </ThemeProvider>
    
  );
}

export default App;
