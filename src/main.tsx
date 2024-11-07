import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AIProvider } from './contexts/AIContext';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <AIProvider>
        <App />
      </AIProvider>
    </AuthProvider>
  </React.StrictMode>
);