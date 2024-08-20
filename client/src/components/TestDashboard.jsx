import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../input/PasswordInput';
import { validateEmail } from '../utils/Helper';
import axiosInstance from '../utils/AxiosInstance';
// import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

function TestDashboard() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const testid = "66c253fecc9e67a4a243ce8a";
        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
    
        if(!password){
            setError("Please enter password");
            return;
        }
        setError("");
    
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email: email,
                password: password,
            });
            
            console.log("Response:", response.data);
    
            if(response.data){
                localStorage.setItem("token", response.data.accessToken);
                navigate(`/test-environment/${testid}`);
            }
        } catch (error) {
            console.error("Login Error:", error);
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }

};

// style for background
const style = {
    // backgroundImage: `url(${backgroundimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '80vh', // Adjust as needed
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
        <div className='flex flex-row justify-center items-center h-screen bg-gray-100'>
            <div className='absolute left-80'>
            <img src={logo} className='w-72'></img>
            </div>
            <div style={style} className='rounded-2xl shadow-2xl shadow-black text-black'>
                <div className='flex flex-col gap-4 p-4 w-1/3
                relative top-1/4 left-2/4 text-center'>

                    <h1 className='text-xl font-semibold'>
                    Login
                    </h1>

                    <form 
                    className='flex flex-col gap-3'
                    onSubmit={handleLogin} >

                        
                        <label className='text-left font-serif'>Email</label>

                        <input type='text' 
                        placeholder='Email' 
                        className='input-box text-black font-serif p-2'
                        style={InputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <label className='text-left font-serif'>Password</label>

                        <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                        
                        {/* if error than print  */}
                        {error && <p className='text-red-500 pb-1 text-md'>{error}</p>}

                        <button type='submit' 
                        className="bg-orange-700 p-2 rounded text-white active:bg-orange-800">
                        Login
                        </button>

                        <p>Not resgister yet?{" "}
                            <Link to={"/signup"} 
                            className='text-orange-600 underline'>
                            Create an Account
                            </Link>
                        </p>

                    </form>

                </div>
            </div>
        </div>
    </>
  )
}

export default TestDashboard