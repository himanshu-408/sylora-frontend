import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"

const Navbar = ({userInfo}) => {

    const isToken = localStorage.getItem("token");
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    }
  return (
    <div className="bg-white flex item-center justify-between px-6 py-2 mt-2 drop-shadow sticky top-0 z-10">
        <img src={logo} alt="Sylora" className="h-9" />

        {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>}
    </div>
  )
}

export default Navbar