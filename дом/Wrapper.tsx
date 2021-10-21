import React from "react";

//Компоненты
import SignIn from "./Singin/SingIn";
import mainPage from "./MainPage/MainFile";

//Стили и пропсы
import {useStyles} from "./Styles";
import {componentProps} from "./ComponentInterface";

import { BrowserRouter, Route, Router, Switch } from "react-router-dom"

//<SignIn  dataSelectMenu={'test'} />

const Wrapper = () =>
{
    const styles = useStyles();
    return(
        <main>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={SignIn }/>
                    <Route exact path='/main' component={mainPage}/>
                </Switch>
            </BrowserRouter>
        </main>
    )
}

export default Wrapper;