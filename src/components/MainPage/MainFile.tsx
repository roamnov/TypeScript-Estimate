import { Container } from "@material-ui/core";
import React from "react";
import ResponsiveDrawer from "./Drawer";
import DashboardNavbar from "./Header";
import SideBar from "./SideBar";



const mainPage = () => {
    return(
        <Container>
            <DashboardNavbar/>
           
            <ResponsiveDrawer setBackInfo={function (value: any) {
                throw new Error("Function not implemented.");
            } } /> 
            
        </Container>
    )
} 

export default mainPage;
