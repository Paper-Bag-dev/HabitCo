import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { Context, server } from './main';

function App() {
  const { setIsAuthenticated, setLoading, setUser} = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
    .get(`${server}/users/me`, {
      withCredentials: true,
    })
    .then((res) => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    })
    .catch((error) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/Register" element={<Register />}/>
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
