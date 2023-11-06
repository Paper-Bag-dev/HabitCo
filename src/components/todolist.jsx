import React, { useEffect, useState } from 'react'
import logoP from '../assets/logoP.png'
import { Context, server } from "../main";
import { BsPlusLg } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useContext } from 'react';

const TodoList = () => {
  // Todo List
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { isAuthenticated, refresh, setRefresh, user} = useContext(Context);

  const updateHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`${server}/task/${id}`, {}, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const deleteHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/task/newTask`, {
        description: inputText
      },
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        })
        
      setInputText("");
      
      toast.success(data.message);
      setRefresh((prev) => !prev);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // Calendar Posting --> Do this operation directly in backend later

  const AddFreqToCalendar = async (countOfTrues) => {
    try {
      console.log(countOfTrues);
      await axios.put(`${server}/calendar/AddFreq/${countOfTrues}`, {}, {
        withCredentials: true
      })
      setRefresh((p) => !p);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  useEffect(() => {
    axios
      .get(`${server}/task/getMyTasks`, {
        withCredentials: true,
      })
      .then((res) => {
        setTodos(res.data.tasks);
        const arrayOfIscomplete = res.data.tasks.map((item) => item.isCompleted === true);
        const countOfTrues = arrayOfIscomplete.reduce((count, isComplete) => count + (isComplete ? 1 : 0), 0);
        console.log(countOfTrues);
        AddFreqToCalendar(countOfTrues);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  return (
    <div className="flex flex-col h-full">
      <div className=" bg-[#161616] text-center justify-center py-4 text-3xl font-semibold flex">
        <div className="flex justify-center items-center">HabitCo</div>
        <div><img draggable={false} src={logoP} width={60} /></div>
      </div>

      {/* Todos and archived */}
      <div>

        <div className="flex flex-col px-2 items-center overflow-auto overflow-x-hidden overflow-y-auto h-[500px]">
          {/* Single todo */}
          {todos.map((item, itemVal) => (<div className={`bg-[#313131] px-4 font-extrabold select-text overflow-hidden w-full rounded-lg flex min-h-[56px] items-center m-1 text-xl`} key={itemVal}>
            <input onClick={() => updateHandler(item._id)} className=" text-[#424242] p-4 bg-[#424242] border-0 focus:ring-0 focus:ring-offset-0  rounded-lg mr-4" type="checkbox" defaultChecked={item.isCompleted} />
            <div className="truncate w-[80%]">{item.description}</div> <div className="ml-auto cursor-pointer"> <button disabled={loading} onClick={() => deleteHandler(item._id)}> <RxCross1 className=" text-[#9a9a9a]/20 hover:text-[#9a9a9a]" /> </button> </div>
          </div>))}
          <div className=" bg-white/60 m-6 w-48 rounded-xl min-h-[6px]" />
        </div>

      </div>
      <div className=" z-10 absolute pointer-events-none bottom-0 pt-20 bg-gradient-to-t from-black to-transparent">
        <form onSubmit={submitHandler} className="flex justify-center pointer-events-auto">
          <div className="px-2 py-2 flex">
            <input className="bg-[#3b3b3b] border-0 focus:ring-0 rounded-lg py-3 text-xl text-white w-full placeholder:text-slate-200/40" placeholder="Enter your tasks" value={inputText} onChange={(e) => setInputText(e.target.value)} required />
            <button disabled={loading} className="bg-green-600 px-3 ml-2 text-center rounded-lg" type="submit"><BsPlusLg size={30} /></button>
          </div>
        </form>
        <div className="h-20 bg-[#2b2b2b] rounded-t-md mt-auto text-4xl text-center">
          <div className=" text-xl"> <b>User :</b> {user?.name}</div>
          <p className=" text-xl"> <b>Email : </b> {user?.email}</p>
        </div>
      </div>


    </div>
  )
}

export default TodoList