import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Products from './pages/Products'
import ProductsDetail from './pages/productsDetail'


function App() {
 

  return (
   
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Products/>}/>
      {/* <Route path='/' element={<Home />}/> */}
      <Route path='/signin' element={<Signin />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/products/:id' element={<ProductsDetail/>}  />
      <Route path='/products' element={<Products/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App