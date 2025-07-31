import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import { HeroUIProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/AuthContext'
import 'flowbite';
import 'flowbite-react';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
  <BrowserRouter>
  {/* <React.StrictMode> */}
    <HeroUIProvider>
     
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      
    </HeroUIProvider>
  {/* </React.StrictMode> */}
  </BrowserRouter>
  </AuthContextProvider>
)
