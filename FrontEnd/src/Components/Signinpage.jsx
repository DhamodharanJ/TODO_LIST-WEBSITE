import React, { useRef, useState } from 'react'
import '../signin.css'
import axios from 'axios';
import Cookies from 'js-cookie';

function Signinpage({ setUserLogin }) {

  const [userName, SetUserName] = useState('');
  const [password, Setpassword] = useState('');
  const [repeatPassword, SetRepeatpassword] = useState('')
  const [valid, setValid] = useState('')
  const [goLogin, setGoLogin] = useState(true)
  const refValue = useRef(null)
  const [loading,setLoading]=useState(false);


  const BASE_URL = import.meta.env.VITE_BASE_URL;
  // console.log(BASE_URL)

  const submit = function () {
    if (goLogin && password === repeatPassword && password !== '' && userName != '') {
      setLoading(true)
      axios.post(`${BASE_URL}/post-userdata`, {
        username: userName,
        password: password,
      }).then((res) => {
        // console.log(res.data.token)
        setValid(res.data.message)
        Cookies.set('token', res.data.token)
      }).catch((error) => {
        setValid(error.response.data)
      })
      .finally(()=>{ setLoading(false)})
    } else if (!goLogin && password !== '' && userName != '') {
      setLoading(true)
      axios.post(`${BASE_URL}/post-login`, {
        username: userName,
        password: password,
      })
        .then((res) => {
          // console.log(res.data.token)
          setValid(res.data.message)
          Cookies.set('token', res.data.token)
          setUserLogin(true)
          setLoading(true)
        })
        .catch((error) => {
          // console.log(error)
          setValid(error)
        })
        .finally(()=>{ setLoading(false)})
    }
    else {
      setValid("Invalid Input")
    }
  }


  function login() {
    SetUserName('')
    Setpassword('')
    SetRepeatpassword('')
    setValid('')
    setGoLogin(!goLogin)
  }

  return (
    <div id='signpage'>
      {
        loading && 
      <div id="loading-bg">
       <div className="loader"></div>
      </div>
      }
      <div className="sign">
        <h1>{goLogin ? "Sign In" : "Login In"}</h1>
        <div className="field">
          <label>UserName:</label><input type='text' value={userName} onChange={(e) => { SetUserName(e.target.value) }}></input><br /><br /></div>
        <div className="field">
          <label>Password:</label><input type='password' value={password} onChange={(e) => { Setpassword(e.target.value) }}></input><br /><br /></div>
        {
          goLogin &&
          <div className="field">
            <label>Repeat Password:</label><input type='password' value={repeatPassword} onChange={(e) => { SetRepeatpassword(e.target.value) }}></input><br /><br /></div>
        }
        {
          <span style={{ fontSize: '1rem' }} ref={refValue}>{valid}</span>
        }

        <button onClick={submit}>{goLogin ? "Sign In" : "Login In"}
        </button>

        <p style={{ fontSize: '1rem' }}>{goLogin ? "If you already an account" : "Do you want to create an account"}</p><p style={{ color: 'blue' }} onClick={login}>{goLogin ? "Log In" : "Sign In"}</p>

      </div>
    </div>
  )
}

export default Signinpage
