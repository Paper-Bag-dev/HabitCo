import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const server = "https://habitcobackend.onrender.com/api/v1";
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, loading, setLoading, user, setUser, refresh, setRefresh}}>
      <App />
    </Context.Provider>
  )
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
