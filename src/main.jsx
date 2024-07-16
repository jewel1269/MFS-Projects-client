import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Component/Home/Home.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Route.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
