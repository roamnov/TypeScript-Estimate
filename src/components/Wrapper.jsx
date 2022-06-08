import React, {  useState } from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import MainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import WrapperRightSide from "./MainPage/WrapperMainFile";
import { get_cookie } from "./Url";
import { HashRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "../provider/ThemeProvider";


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
            
          
                <HashRouter>
                    <Routes>
                        <Route  path='/' element={<SignIn  />}/>
                        <Route path='/main' element={<ThemeProvider> <WrapperRightSide/> </ThemeProvider>}/>
                    </Routes>
                </HashRouter>
          
        </main>
    )
}

export default Wrapper;