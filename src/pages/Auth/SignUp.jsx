import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import loginImage from "../../assets/login-image.jpg"
import axiosInstance from '../../utils/axiosInstance'
// import { validateEmail } from '../../utils/helper';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // if(!validateEmail(email)){
    //   setError("Please enter a valid email.")
    //   return;
    // }

    try{
      const response = await axiosInstance.post("/create-account", {
        fullName : name,
        email: email,
        password: password,
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        console.log(error);
          setError("An unexpected error occurred, Please try again.");
      }
    }
  }


  return (
    <div className='h-screen bg-green-50 overflow-hidden relative'>
        <div className='container h-screen flex items-center justify-center px-20 mx-auto'>
          <div className="w-2/4 h-[90vh] flex items-end bg-cover bg-center rounded-lg p-10 z-50" style={{"backgroundImage": `url(${loginImage})`}}>
            <div>
              <h4 className="text-5xl text-white font-semibold leading-[58px]">
                Join the <br /> Adventures
              </h4>
              <p className="text-[15px] text-white leading-6 pr-7 mt-4">Create an account to start documneting your travels and preserving your memories in your personal travel journal.</p>
            </div>
          </div>
          <div className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg flex items-center">
            <form onSubmit={handleSignUp}>
              <h4 className="text-2xl font-semibold mb-7">Create an Account</h4>
              <input type="text" placeholder='Full Name' className='input-box' value={name} onChange={({target}) => { setName(target.value)}}/>
              <input type="text" placeholder='Email' className='input-box' value={email} onChange={({target}) => { setEmail(target.value)}}/>
              <input type="password" placeholder='Password' className='input-box' value={password} onChange={({target}) => { setPassword(target.value)}}/>

              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

              {(name && email && password) ? <button type="submit" className='btn-primary'>CREATE ACCOUNT</button> : <></>}

              <p className="text-xs text-slate-500 text-center my-4">Or</p>
              <button type="submit" className='btn-primary btn-light' onClick={() => {navigate('/login')}}>LOGIN</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SignUp;