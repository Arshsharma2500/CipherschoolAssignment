import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../input/PasswordInput'
import { validateEmail } from '../utils/Helper';
import axiosInstance from '../utils/AxiosInstance';
import logo from '../assets/logo.png';

function SignUp() {
    const[name, setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null);
  
    const navigate = useNavigate();
  
    const handlesignup = async(e) => {
      e.preventDefault();
      const testid = "66c253fecc9e67a4a243ce8a";
      if(!name){
        setError("Please enter your name");
        return;
      }
      if(!validateEmail(email)){
        setError("Please enter valid email address");
        return;
      }
      if(!password){
        setError("Please enter the password");
        return;
      }
  
      setError("");
      
      // SignUp API cal
      try{
        const response = await axiosInstance.post("/api/auth/register", {
            name: name,
            email: email,
            password: password,
        });
        //Handle successful registration response
        if(response.data){
            setError(response.data.message);
            localStorage.setItem("token",response.data.accessToken)
            navigate(`/test-environment/${testid}`);
            return
        }
  
    } catch (error) {
        //Handle Login error
        if(error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        }else {
            setError("An unexpected error occurred. Please try again.");
        }
  
    }
  
    };
  
      // style for background
      const Style = {
        // backgroundImage: `url(${backgroundimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '90vh', // Adjust as needed
        width: '80%',
      };
  
      const InputStyle = {
        backgroundColor: 'rgba(1, 1, 1, 0.01)',
        border: 'none',
        borderBottom: 'solid black thin',
        borderLeft: 'none',
        color: 'black',
        borderRadius: 'none'
      };
  
    return (
      <>
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <div className='absolute left-80'>
          <img src={logo} className='w-72'></img>
        </div>
        <div style={Style} className='rounded-2xl shadow-2xl shadow-black'>
              <div className='flex flex-col gap-0 p-2 w-1/3
                  relative top-1/4 left-2/4 text-center'>
  
                  <h1 className='text-xl font-semibold'>
                  SignUp
                  </h1>
  
                  <form 
                  className='flex flex-col gap-4'
                  onSubmit={handlesignup} >
  
                      <label className='text-left font-serif'>Name</label>
  
                      <input type='text' 
                      placeholder='Name' 
                      className='input-box p-1'
                      style={InputStyle}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
  
                      <label className='text-left font-serif'>Email</label>
  
                      <input type='text' 
                      placeholder='abc@gmail.com' 
                      className='input-box p-1'
                      style={InputStyle}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
  
                      <label className='text-left font-serif'>Create Password</label>
  
                      <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
  
                      {/* if error than print  */}
                      {error && <p className='text-red-500 pb-1 text-md'>{error}</p>}
  
                      <button type='submit' 
                      className="bg-orange-700 p-2 rounded text-white active:bg-orange-800">
                      Create Account
                      </button>
  
                      <p>Already have account ?{" "}
                          <Link to={"/"} 
                          className='text-orange-600 underline'>
                          Login
                          </Link>
                      </p>
  
                  </form>
              </div>
            </div>
      </div>
      </>
    )
  }
  
  export default SignUp