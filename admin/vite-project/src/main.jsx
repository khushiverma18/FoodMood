import ReactDom from 'react-dom/client';
import './index.css';
import React from 'react';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Correct import

ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
