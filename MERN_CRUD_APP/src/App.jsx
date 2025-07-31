// import { useEffect, useState } from "react"



// import { useMutation, useQuery } from '@tanstack/react-query'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/Header";
import Login from "./pages/Login";
import User from "./pages/user/User";
import { AuthContext } from "./context/AuthContext";
import Cookies from 'js-cookie';
import Admin from "./pages/admin/Admin";
import Teacher from "./pages/teacher/Teacher";





function App() {
  const {user} = useContext(AuthContext)
console.log("user=> ", user)
console.log("token=> ", Cookies.get("token"))

return(
  <>
  <Header />
  <Routes>
    <Route path="/" element= {user ? <Navigate to={"/user"} /> : <Login />} />
    <Route path="/user" element={<User />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/teacher" element={<Teacher />} />
    
  </Routes>
  </>
)
}

export default App