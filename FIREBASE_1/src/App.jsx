import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
 

  return (
   
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='signin' element={<Signin />}/>
      <Route path='/signup' element={<Signup />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App