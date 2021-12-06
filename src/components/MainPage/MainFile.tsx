import { Container } from "@material-ui/core";
import React from "react";
import { LoginIn } from "../Wrapper";
import WrapperRightSide from "./WrapperMainFile";


import DashboardNavbar from "./NotWorkArea(Side&Head)/Header";
import SideBar from "./NotWorkArea(Side&Head)/SideBar";
import { useNavigate, Navigate } from "react-router-dom";



const MainPage = () => {
    let navigate = useNavigate();
    const Value = React.useContext(LoginIn); 
    console.log("ЗАЙДИ И ПОСМОТРИ")
    const auth = localStorage.getItem("auth")
    console.log(auth)
    return(
        <>
        {auth === "true"? <WrapperRightSide/>:<Navigate to="/"/> }
        
        </> 
    )
} 

export default MainPage;
/*
 
*/