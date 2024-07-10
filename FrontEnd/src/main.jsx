import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Signinpage from './Components/Signinpage.jsx'
import { BrowserRouter } from 'react-router-dom'
import RouterSet from './RouterSet.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>   
    <RouterSet />
    {/* <Signinpage /> */}
    </BrowserRouter>
  </React.StrictMode>

)
