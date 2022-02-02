import React, { useMemo, useState } from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import MainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import {componentProps} from "./ComponentInterface";

import { BrowserRouter, HashRouter, Route, Router, Routes } from "react-router-dom"
import { Container } from "@material-ui/core";

//<SignIn  dataSelectMenu={'test'} />
/* 
export const LoginIn = React.createContext({
    auth: '',
    setAuth: () => {}
});
*/
export const LoginIn = React.createContext(false)

export const DrxContext = React.createContext("");

const Wrapper = () =>{
    //const [auth, setAuth] = useState('false');
    //const value = useMemo(() => ({ auth, setAuth }), [auth]);
    const [drx, setDrx] = useState("");
    //const value = useMemo(() => ({ drx, setDrx }), [drx]);
    const styles = useStyles();
    
    return(
        <main >
            
            <DrxContext.Provider value={drx}>
                <HashRouter>
                    <Routes>
                        <Route  path='/' element={<SignIn setData={setDrx}/>}/>
                        <Route  path='/main' element={<MainPage/>}/>
                    </Routes>
                </HashRouter>
            </DrxContext.Provider>
           
        </main>
    )
}

export default Wrapper;