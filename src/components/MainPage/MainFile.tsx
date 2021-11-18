import { Container } from "@material-ui/core";
import React from "react";
import { LoginIn } from "../Wrapper";
import ClippedDrawer from "./WrapperRightSide";


import DashboardNavbar from "./NotWorkArea(Side&Head)/Header";
import SideBar from "./NotWorkArea(Side&Head)/SideBar";



const MainPage = () => {
    const Value = React.useContext(LoginIn); 
    console.log("ЗАЙДИ И ПОСМОТРИ")
   
    return(
    
        <ClippedDrawer/>
           
    )
} 

export default MainPage;
/*
 
*/