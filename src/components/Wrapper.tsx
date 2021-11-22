import React, { useMemo, useState } from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import MainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import {componentProps} from "./ComponentInterface";

import { BrowserRouter, HashRouter, Route, Router, Routes } from "react-router-dom"

//<SignIn  dataSelectMenu={'test'} />
/* 
export const LoginIn = React.createContext({
    auth: '',
    setAuth: () => {}
});
*/
export const LoginIn = React.createContext(false)
const Wrapper = () =>
{
    //const [auth, setAuth] = useState('false');
    //const value = useMemo(() => ({ auth, setAuth }), [auth]);
    const styles = useStyles();
    return(
        <main >
            <LoginIn.Provider value={false}>
            <HashRouter>
                <Routes>
                    <Route  path='/LogIn' element={<SignIn/>}/>
                    <Route  path='/main' element={<MainPage/>}/>
                </Routes>
            </HashRouter>
            </LoginIn.Provider>
        </main>
    )
}

export default Wrapper;