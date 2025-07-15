import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Create a query client instance
const queryClient = new QueryClient();

// 2. Wrap your app with QueryClientProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
