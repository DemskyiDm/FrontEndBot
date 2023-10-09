import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/style.css'
import MainPage from './MainPage';


const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

