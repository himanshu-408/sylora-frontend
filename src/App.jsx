import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Home/Home"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Root />} />
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<SignUp />} />
        </Routes>
      
      </Router>      
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token")
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
   ) : (
    <Navigate to="/login" />
   );
};

export default App;
