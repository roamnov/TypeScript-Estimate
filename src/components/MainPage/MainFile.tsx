import React from "react";
import { Theme } from "../Wrapper";
import WrapperRightSide from "./WrapperMainFile";
import { useNavigate, Navigate } from "react-router-dom";

const MainPage = () => {
    let navigate = useNavigate();
    const Value = React.useContext(Theme);
    console.log("ЗАЙДИ И ПОСМОТРИ")
  //  document.addEventListener("click",  ClickDocument)
    return (
        <>
            <WrapperRightSide />

        </>
    )
}

export default MainPage;
/*
 
*/