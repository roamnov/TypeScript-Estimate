import React from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import mainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import {componentProps} from "./ComponentInterface";

import { BrowserRouter, HashRouter, Route, Router, Switch } from "react-router-dom"

//<SignIn  dataSelectMenu={'test'} />

const Wrapper = () =>
{
    const styles = useStyles();
    return(
        <main>
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={SignIn }/>
                    <Route exact path='/main' component={mainPage}/>
                </Switch>
            </HashRouter>
        </main>
    )
}

export default Wrapper;