import React from "react";
import { Theme } from "../Wrapper";
import WrapperRightSide from "./WrapperMainFile";
import { useNavigate, Navigate } from "react-router-dom";

const MainPage = () => {
    let navigate = useNavigate();
    function ClickDocument(ev: any) {
        let AllList, list, itemList
        AllList = document.querySelectorAll("div.css-b62m3t-container")
        console.log(AllList)
        for (let i = 0; i<=AllList.length - 1; i = i+1)
        {
            list = AllList[i];
            const withinBoundaries = ev.composedPath().includes(list);
            if ( ! withinBoundaries ){
                itemList = list.querySelector("div.select__menu") 
                if (itemList)
                {
                    itemList.remove();
                }
            }
            
        }
    }
    const Value = React.useContext(Theme);
    console.log("ЗАЙДИ И ПОСМОТРИ")
    document.addEventListener("click", (e) => {ClickDocument(e) })
    return (
        <>
            <WrapperRightSide />

        </>
    )
}

export default MainPage;
/*
 
*/