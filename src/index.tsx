import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Wrapper from "./components/Wrapper";
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainFile';
import SignIn from './components/Singin/SingIn';
import { GlobalStyleDocTabs, GlobalStyleTree, GlobalStyleDBview, GlobalStyleGrid,GlobalStyleDropList, GlobalStyleCheckBox, GlobalStyleResizePanel } from "./components/MainPage/GlobalStyled"
//let pref = require('./components/stimweb/tools/trsview.html')
ReactDOM.render(
    <React.StrictMode>
      <GlobalStyleDocTabs />
      <GlobalStyleTree />
      <GlobalStyleDBview />
      <GlobalStyleGrid />
      <GlobalStyleDropList />
      <GlobalStyleCheckBox />
      <GlobalStyleResizePanel />
      <Wrapper/>
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
