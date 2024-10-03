import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartLengthProvider } from './context/CartLengthContext';

window.ajaxLink = "http://localhost:5000";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartLengthProvider>
      <App />
    </CartLengthProvider>
  </StrictMode>,
)
