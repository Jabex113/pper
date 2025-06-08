import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import FAQPage from './pages/FAQPage';
import './index.css';

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#d1b3ff',
      200: '#b280ff',
      300: '#934dff',
      400: '#741aff',
      500: '#5b00e6',
      600: '#4500b4',
      700: '#300082',
      800: '#1c0050',
      900: '#0a001f',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#f9f9fb',
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
); 