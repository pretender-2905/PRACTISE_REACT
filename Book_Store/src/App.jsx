import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/notFound'
import Header from './components/Header'
import Auth from './pages/Auth'
import Signin from './pages/Auth/signin'
import Signup from './pages/Auth/signup'

function App() {
  const [count, setCount] = useState(0)

  return ( 

    <BrowserRouter>
        <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/notFound" element={<NotFound/>} />


        <Route path='/auth'>
        <Route index element={<Auth />}/>
        <Route path="signin" element={<Signin />}/>
        <Route path='signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
