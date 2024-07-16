import React from 'react';
import Home from '../Component/Home/Home';
import Navber from '../Component/Navber';
import MobileApp from '../Component/MobileApp/MobileApp';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
    return (
        <div>
           <MobileApp/>
            <Navber/>
            <ToastContainer/>
        </div>
    );
};

export default Root;