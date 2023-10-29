import React, { useContext, useState } from 'react'
import {toast} from 'react-hot-toast'
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import axios from 'axios';

const Login = () => {
  const [visible, setVisible] = useState(false);
  
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/register`, {
        name,
        email,
        password
      },
      {
        headers: {
          "Content-Type" : "application/json",
        },
        withCredentials: true
      });

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
      console.log(error);
    }
    // creating Calendar storage area
    try {
      const {data} = await axios.post(`${server}/calendar/createData`, {

      }, {
        withCredentials: true
      })
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  if(isAuthenticated) return <Navigate to={"/"} />

  return (
    <div className="flex min-h-screen text-white bg-black/95 justify-center items-center font-montserrat">
      <div className="bg-[#222222] flex flex-col w-[400px] h-[600px] rounded-xl p-4 text-center items-center font-montserrat">
        <div className=" w-full text-4xl h-10">HabitCo</div>
        <div className="h-1 bg-white/20 rounded-xl mt-6 w-full"></div>

        <form onSubmit={submitHandler} className=" h-full w-full items-center flex flex-col justify-center">
          <span className=" w-full p-2 text-3xl text-[#bbbbbb]">Register</span>

          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" className="bg-[#313131] border-0 mt-10 mb-5 text-[#c4c4c4] rounded-xl h-12 w-72" required/>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" className="bg-[#313131] border-0 mb-5 text-[#c4c4c4] rounded-xl h-12 w-72" required/>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} placeholder="Enter Password" className={`bg-[#313131] text-lg border-0 mt mb-0 text-[#c4c4c4] rounded-xl h-12 w-72 z-0`} required/>
          
          <div className="fixed ml-60 mt-20"> 
          {visible ? <AiFillEye size={25} className=" text-gray-500 hover:text-gray-400 transition-all hover:cursor-pointer " onClick={() => setVisible(!visible)} /> : 
          <AiFillEyeInvisible className=" text-gray-500 hover:text-gray-400 transition-all hover:cursor-pointer " onClick={() => setVisible(!visible)} size={25}/> } 
          </div>
          <button disabled={loading} className="bg-[#313131] border-0 mt-5 text-[#c4c4c4] rounded-xl hover:bg-green-600 hover:text-white transition-all h-12 w-72" >Register</button>
            <span className="my-4 text-[#868686]">Or</span>
            <span className=" hover:cursor-pointer underline text-[#d6d6d6]"><Link to="/login">Login</Link></span>
        </form>

        <div className="flex w-full justify-between">
            <span className="mx-4 my-4  text-[#868686]">Forgot Password?</span>
          </div>
      </div>
    </div>
  )
}

export default Login