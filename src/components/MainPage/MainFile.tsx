import { Container } from "@material-ui/core";
import React from "react";
import ResponsiveDrawer from "./Drawer";

import DashboardNavbar from "./Header";
import SideBar from "./SideBar";
import Tree from "./Tree/tree";



const mainPage = () => {
    return(
        <Container>
            
            <ResponsiveDrawer  /> 
                      
        </Container>
    )
} 

export default mainPage;
/*
 
*/