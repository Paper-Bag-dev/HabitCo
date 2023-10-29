import React, { useContext } from 'react'
import { Context, server } from "../main";
import TodoList from '../components/todolist';
import { BiLogOut } from 'react-icons/bi'
import CalendarComponent from '../components/CalendarComponent';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      })
      toast.success("Logged Out");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  if (!isAuthenticated) return <Navigate to={"/login"} />;
  
  return (
    <div className="flex min-h-screen text-white bg-black/95 font-montserrat">
    <div className=" h-screen min-w-[350px] bg-[#202020] shadow-black shadow-lg">
      <TodoList />
    </div>
    
    <CalendarComponent />

    <div className=" min-w-[60px] shadow-black shadow-lg max-h-full flex flex-col items-center bg-[#202020]">
      <div className=" bg-blue-500/70 my-4 h-12 w-11 rounded-full hover:cursor-pointer" />
      <div className="flex flex-col-reverse h-full w-full items-center">
      <button onClick={logoutHandler}>
        <BiLogOut className="mb-4 hover: " size={30} />
      </button>
      </div>
    </div>
  </div>
  )
}

export default Dashboard