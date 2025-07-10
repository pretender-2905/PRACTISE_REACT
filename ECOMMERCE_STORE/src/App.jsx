import { BrowserRouter, Route, Routes } from "react-router-dom"
import Products from "./pages/Products"
import React from "react";
import Header from "./components/Header";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";



function App() {


  return (

    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App