import { Container } from "@material-ui/core";
import React from "react";
import { LoginIn } from "../Wrapper";
import ClippedDrawer from "./WrapperRightSide";


import DashboardNavbar from "./Header";
import SideBar from "./SideBar";



const MainPage = () => {
    const Value = React.useContext(LoginIn); 
    console.log(Value)
   
    return(
    
        <ClippedDrawer/>
           
    )
} 

export default MainPage;
/*
 
*/