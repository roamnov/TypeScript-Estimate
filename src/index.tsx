import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Wrapper from "./components/Wrapper";
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainFile';
import SignIn from './components/Singin/SingIn';
import { GlobalStyleDocTabs, GlobalStyleTree, GlobalStyleDBview, GlobalStyleGrid } from "./components/MainPage/GlobalStyled"
//let pref = require('./components/stimweb/tools/trsview.html')

ReactDOM.render(
  <HashRouter>
    <React.StrictMode>
      <GlobalStyleDocTabs />
      <GlobalStyleTree />
      <GlobalStyleDBview />
      <GlobalStyleGrid />
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/main' element={<MainPage />} />
      </Routes>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);

reportWebVitals();
