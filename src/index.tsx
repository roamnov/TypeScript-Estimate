import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Wrapper from "./components/Wrapper";
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainFile';
import SignIn from './components/Singin/SingIn';
import { GlobalStyleDocTabs, GlobalStyleTree, GlobalStyleDBview, GlobalStyleGrid,GlobalStyleDropList, GlobalStyleCheckBox, GlobalStyleResizePanel, StyleSmartWebcomponents } from "./components/MainPage/GlobalStyled";
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
      <StyleSmartWebcomponents />
      <style>
        {`
        .text-field {
          margin-bottom: 1rem;
        }
    
        .text-field__input {
          display: block;
          width: 100%;
          height: 100%;
          font-family: inherit;
         
          font-weight: 400;
         
          color: #212529;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #bdbdbd;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

    
        .text-field__input::placeholder {
          color: #212529;
          opacity: 0.4;
        }
    
        .text-field__input:focus {
          color: #212529;
          background-color: #fff;
         /* border-color: #bdbdbd;*/
          outline: 0;
         /* box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);*/
        }
    
        .text-field__input:disabled,
        .text-field__input[readonly] {
          background-color: #f5f5f5;
          opacity: 1;
        }
    
        /* active icon - 1 вариант */
        .text-field__icon {
          position: relative;
        }
        .text-field__icon input
        {
          border:none;
          borderRadius: "0";
          transition: "";
        }
        .text-field__icon .text-field__input {
          padding-right: 2.5rem;
        }
    
        .text-field__aicon:hover {
          color: #212529;
        }
    
        /* active icon - 2 вариант */
        .textFieldIcon {
          
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          bottom: 0;
          right: 0;
          width: 18px;
          border: 1px solid #bdbdbd;
          background-color: #f5f5f5;
          cursor: pointer;
          color: #212529;
          transition: background-color 0.15s ease-in-out;
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
    
        .textFieldIcon:hover {
          background-color: #e0e0e0;
        }
        `}
      </style>
      <Wrapper/>
      
    </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
