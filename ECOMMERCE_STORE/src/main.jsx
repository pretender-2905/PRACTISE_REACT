import React from 'react'
import ReactDOM from 'react-dom/client'
import {HeroUIProvider} from '@heroui/react'
import './index.css' // This must be imported
import App from './App';
import AuthContextProvider from './context/AuthContext'
import CartContextProvider from './context/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
       <AuthContextProvider>
        <CartContextProvider>
         <App />
        </CartContextProvider>
       </AuthContextProvider>
    </HeroUIProvider>
  </React.StrictMode>,
)