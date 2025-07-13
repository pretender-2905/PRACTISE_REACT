import { BrowserRouter, Route, Routes } from "react-router-dom"
import Products from "./pages/Products"
import React from "react";
import Header from "./components/Header";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import ProductsDetail from "./pages/productsDetail";
import Cart from "./pages/Cart";



function App() {


  return (

    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="products/:id" element={<ProductsDetail />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App