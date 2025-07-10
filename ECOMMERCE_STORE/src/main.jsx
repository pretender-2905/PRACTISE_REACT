import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import {HeroUIProvider} from '@heroui/react'
import App from './App'
import './index.css' // This must be imported
// import AuthContextProvider from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      
      {/* <AuthContextProvider> */}
       
         <App />
     
     
      {/* </AuthContextProvider> */}
    </HeroUIProvider>
  </React.StrictMode>,
)