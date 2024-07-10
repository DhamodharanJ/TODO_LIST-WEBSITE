import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Signinpage from './Components/Signinpage'
import App from './App'
import axios from 'axios'

function RouterSet() {
  const [userLogin, setUserLogin] = useState(false)
  const [list, setTodoData] = useState([]);
  const [loading,setLoading]=useState(true);

  const BASE_URL=import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/get-data`, { withCredentials: true })
      .then((res) => {
        setUserLogin(true)
        setLoading(false);
        setTodoData(res.data.data)
        // console.log(res.data.data)
      }).catch((error) => {
        setUserLogin(false)
        setLoading(false);
      })
  }, [userLogin])


  return (
    <div>
      {/* <h1>hello</h1> */}
      
    <Routes>
      <Route path="/"  element={userLogin ? <App list={list} setTodoData={setTodoData} loading={loading} setUserLogin={setUserLogin}/> : <Signinpage setUserLogin={setUserLogin} />} />
    </Routes>
    </div>
  )
}

export default RouterSet
