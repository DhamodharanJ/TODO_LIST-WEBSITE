import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css'
// import todoModel from '../../BackEnd/Models/TodoModel';
function App(props) {
  const [statement, setStatement] = useState("")
  const [username,setUsername]=useState('');
  
  function written(e) {
    setStatement(e.target.value);
  }

  const BASE_URL=import.meta.env.VITE_BASE_URL;

useEffect(()=>{
  axios.get(`${BASE_URL}/get-username`,{withCredentials:true})
  .then((res)=>{
    setUsername(res.data);
  }).catch((error)=>{
    console.log(error);
  })
},[]
)

const {list,setTodoData,loading,setUserLogin} = props

  function submit() {
    if (statement !== '') {

      try {

        axios.post(`${BASE_URL}/set-data`, {
          list: statement
        }, { withCredentials: true })
          .then((res) => {
            axios.defaults.withCredentials = true;
            setTodoData([...list, res.data])
            setStatement('')
          }).catch((error) => {
            console.log(error)
          })
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  function update(updindex, id) {
    const newdata = prompt("Enter the value", list[updindex].list)
    if (newdata !== '' && newdata != null) {
      try {
        axios.put(`${BASE_URL}/update-data/${id}`, {
          list: newdata,
        })
          .then((res) => {
            console.log(res.data)
            const newList = [...list];
            newList[updindex] = res.data;
            setTodoData(newList)

          })
          .catch((error) => {
            console.log(error)
          })
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  function deleted(delindex, id) {

    try {
      axios.delete(`${BASE_URL}/delete-data/${id}`).then((res) => {
        const newdata = list.filter((value, index) => { return index !== delindex })
        setTodoData(newdata)
      }).catch((error) => {
        console.log(error)
      })

    }
    catch (error) {
      console.log(error)
    }
  }
function logout(){
  axios.get(`${BASE_URL}/user-logout`,{withCredentials:true})
  .then((res)=>{
    setUserLogin(false);
  })
  .catch((error)=>{
  })
  
}

  return (
    <div id='body'>
      <div id="container">
      <div id='nav'>
        <h2>Hello {username && username}</h2>
        <h1>TODO-LIST</h1>
        <button id='logout' onClick={logout}>log out</button>
        </div>
        <div className="content">
          <div className="search">
            <input type="text" name="" id="input" placeholder='Add your To Do' onKeyUp={(e) => { e.key == 'Enter' && submit() }} onChange={written} value={statement} />
            <button onClick={submit}>ADD</button>
          </div>
          {
            Array.isArray(list) && list.length !== 0 && list.map((value, index) => {
              return <div key={index} className='maindata'>
                    <span>{value.list}</span>
                    <div>
                        <button onClick={() => update(index, value._id)}>
                        <i id='edit' className="fa fa-edit"></i>
                        </button>
                        <button onClick={() => deleted(index, value._id)}>
                          <i id='delete'
                           className="material-icons" >delete</i>
                        </button>
                    </div>
                  </div>
            })
          }
          
          {loading && <h1>loading</h1>}
        </div>
        <h3>Developed by Dhamodharan</h3>

      </div>
    </div>
  )
}

export default App
