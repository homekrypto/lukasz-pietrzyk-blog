
import React from 'react';
import ReactDOM from 'react-dom/client';
import CompleteApp from './CompleteApp';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <CompleteApp />
  </React.StrictMode>
);
