import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/styles/style.css'
import AddEmplPage from './components/addEmpl/AddEmplPage';


const root = ReactDOM.createRoot(document.getElementById('AddEmpl'));
root.render(
  <React.StrictMode>
    <AddEmplPage />
  </React.StrictMode>
);

//.