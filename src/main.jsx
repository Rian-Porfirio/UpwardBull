import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
            <App />
      </Router>
  </React.StrictMode>,
)
