import React from 'react'
import ReactDOM from 'react-dom/client'

import {HeroUIProvider} from '@heroui/react'
import './index.css' // This must be imported
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      
     
       
         <App />
      
     
     
    
    </HeroUIProvider>
  </React.StrictMode>,
)