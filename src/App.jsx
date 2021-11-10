import Editor from "./components/Editor";
import {ThemeProvider } from '@mui/material/styles';
import theme from './theme'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Editor />
      </ThemeProvider>
    </div>
  );
}

export default App;
