import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
    secondary: {
      main: '#0044ff',
    },
    accent: {
        main: '#22223b'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});