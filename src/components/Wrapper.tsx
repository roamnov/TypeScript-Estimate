import React, { useMemo, useState } from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import MainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import {componentProps} from "./ComponentInterface";

import { BrowserRouter, HashRouter, Route, Router, Switch } from "react-router-dom"

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
        <main>
            <LoginIn.Provider value={false}>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={SignIn }/>
                    <Route exact path='/main' component={MainPage}/>
                </Switch>
            </HashRouter>
            </LoginIn.Provider>
        </main>
    )
}

export default Wrapper;