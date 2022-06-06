import React, {  useState } from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import MainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import WrapperRightSide from "./MainPage/WrapperMainFile";

import { HashRouter, Route, Routes } from "react-router-dom"


//<SignIn  dataSelectMenu={'test'} />
/* 
export const LoginIn = React.createContext({
    auth: '',
    setAuth: () => {}
});
*/

export const Theme = React.createContext("");

const Wrapper = () =>{
    //const [auth, setAuth] = useState('false');
    //const value = useMemo(() => ({ auth, setAuth }), [auth]);
    const [theme, setTheme] = useState("");
    //const value = useMemo(() => ({ drx, setDrx }), [drx]);
    const styles = useStyles();
    
    return(
        <main >
            
            <Theme.Provider value={(theme,setTheme)}>
                <HashRouter>
                    <Routes>
                        <Route  path='/' element={<SignIn  />}/>
                        <Route path='/main' element={<WrapperRightSide/>}/>
                    </Routes>
                </HashRouter>
            </Theme.Provider>
           
        </main>
    )
}

export default Wrapper;