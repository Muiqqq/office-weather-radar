import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Arial, sans-serif'],
  },
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#E5F6FD',
    },
    background: {
      main: '#F8F9FA',
    },
  },
});

export default theme;
