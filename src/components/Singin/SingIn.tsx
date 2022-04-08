import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import {
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  CssBaseline,
  Button,
  Typography,
  Box,
  styled,
  ButtonProps,
} from "@material-ui/core";
//стили и интерфейсы пропсов
import { useStyles } from "../Styles";
import { componentProps, ProjectEnterInfo } from "../ComponentInterface";
import money from "../../static/images/money.png"
//копмпоненты
import SelectDrx from "./SelectDrx";
import SelectUser from "./SelectUser";
import SelectWorkPlace from "./SelectWorkPlace";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import URL, { AxiosRequest, CreateCokies, XMLrequest } from "../Url";
import { purple, red } from "@material-ui/core/colors";
import { Link,  useNavigate } from "react-router-dom";
import { DrxContext, LoginIn } from "../Wrapper";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
// import {TestPlug} from "./core"

const VERSIONS_JSON_URL = 'http://stimate.krista.ru/workspaceex/config.json';
const WORKSPACE_REQUEST_TYPE = "workspace-request";
const WORKSPACE_RESPONSE_TYPE = "workspace-response";
const IMG_OK = "images/ok.png";
const IMG_WARNING = "images/warning.png";
const IMG_ERROR = "images/error.png";



var CmsDettachedUID:any;
var CheckedCryptoUID:any;
var VersionUID:any;
var PluginVerUID:any;
var CertUID:any;
var CertUIDAsXML:any;
var scanUid:any;
var mySerialNumber:any;



var workspaceConfig:any;
workspaceConfig = null






const SignIn = () => {
  const styles = useStyles();
  document.title = "Вход в систему";
  
  let navigate = useNavigate();
  const [error, setError] = useState<string | null>("");
  const [drx, setDrx] = useState("");
  const [user, setUser] = useState("");
  const [workplace, setWorkPlace] = useState("");
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  
  var CERTS_XML_KEY = "certList";

  function executeCertListAsXML() {
    CertUIDAsXML = uuid();
    sendRequest(
        {
          type: "workspace-request",
          requestId: CertUIDAsXML, 
          params: {
              command: "sign",
              data: "ezlDMTM4RUNDLTgzQ0MtNDAyMy1BOEFFLTZDNjI4OTM3OTQ2RH0=",
              format:"CMS",
              serialNumber: null,
              type: "detached"
            }
        });
  }

  window.addEventListener("message", (messageEvent) => {
    if (WORKSPACE_RESPONSE_TYPE == messageEvent.data.type) {
        var response = messageEvent.data;
        console.log(response)
        switch (response.requestId) {
          
            case PluginVerUID:
                // var actualExtensionVersion = getActualExtensionVersion();
                // if (actualExtensionVersion == 0 || parseFloat(response.result) < actualExtensionVersion) {
                //     markExtensionIsOutOfDate(response.result, actualExtensionVersion);
                //     showWarning();
                // } else {
                //     markExtensionIsRelevant(response.result);
                // }
                // onVersionClick();
                break;
            case VersionUID:
                // if (response.result != null) {
                //     if (workspaceConfig == null || parseFloat(response.result) < workspaceConfig.hostApp.version) {
                //         markHostAppObsolete(response.result, workspaceConfig == null ? 0 : workspaceConfig.hostApp.version);
                //         showWarning();
                //     } else {
                //         markHostAppRelevant(response.result);
                //     }
                //     elem("tabs").style.display = 'block';
                //     onCheckedCryptoProvider();
                // } else {
                //     markHostAppUninstalled();
                //     showWarning();
                // }
                break;
            case CheckedCryptoUID:
                // elem("cryptoImage").src = IMG_OK;
                // if (response.result.indexOf("ошибка при получении криптопровайдера") == -1) {
                //     elem("cryptoID").innerHTML = "Криптопровайдер установлен.";
                //     elem("cryptoID").style.color = "green";
                //     elem("cryptoImage").src = IMG_OK;
                //     executeCertListAsXML();
                // } else {
                //     showWarning();
                // }
                // elem("cryptoBlock").style.display = 'block';
                break;    
            case CertUIDAsXML:// УСПЕХ
                    console.log(response.result)
                
                break;
            case CmsDettachedUID:
                // elem("resultCMS").value = elem("resultCMS").value + "Серийный номер сертификата: " + mySerialNumber + "\n";
                // elem("resultCMS").value = elem("resultCMS").value + "Данные по-умолчанию:" + " SGVsbG8sIHdvcmxkIQ== " + "\n";
                // elem("resultCMS").value = elem("resultCMS").value + "Подпись в формате Cms: " + response.result + "\n";
                break;
            case scanUid:
                // unmask();
                // if (response.successful == false) {
                //     elem("scanImageId").src = "";
                //     alert("Ошибка: " + response.result);
                // } else {
                //     elem("scanImageId").src = "data:image/jpg;base64, " + response.result;
                // }
                break;
        };
  
    }
  }, false);


  
  
  function sendRequest(request:any) {
    window.postMessage(request, "*");
  }
  
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }
  
  

  useEffect(()=>{
    

   

  },[])
  

  useEffect(()=>{
    // TestPlug();
  },[])

  //const ThemeContext = React.createContext('light');

  const GoToMain =(jsonEnter: any)=>{
    
    console.log(jsonEnter["AppName"])
    const AppName = jsonEnter["AppName"];
    CreateCokies("drx",AppName === undefined? drx:AppName )
    CreateCokies("LastLogin", jsonEnter);
    navigate("main");
  }

  const clientPasswordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  function CheckAnswerFromServer(answer?: Object) {
    let test: string;
    setOpen(false)
    switch (answer) {
      case "ConfigName":
        setError(`Файл подключения ${drx} не найден.`);
        break;
      case "UserName":
        setError(`Пользователь ${user} в системе не зарегистрирован.`);
        break;
      case "Password":
        setError(`Пароль неверный.`);
        break;
    }
  }

  const handlekeyDownSignIn = (e:any) =>{
    if(e.keyCode === 13) {
      let res:object 
      setOpen(true)
      console.log(e)
      
      const LoginLast= drx + ","+user+ ","+ workplace; 
      
      let params = new Map();
      params.set('comand','GetUserInfo');
      params.set('ConfigName',drx);
      params.set('UserName',user);
      let  rest
      rest = XMLrequest(params)["Server"];
      let IP = rest;
      let LoginData = {
        ConfigName: drx,
        UserName: user,
        Password: password,
        WorkPlace: workplace,
        //Comp: "NPO5898",
      };
      params = new Map();
      params.set('comand','enter');
      if (IP !="")
      params.set('IP', IP);
      rest = XMLrequest(params,  LoginData);
      rest["error"]!== undefined? CheckAnswerFromServer(rest["error"]["Item"]): GoToMain(LoginLast)
    }
  }

  const handleSingIn = () => {
    
    let res:object 
    setOpen(true)
    
    const LoginLast= drx + ","+user+ ","+ workplace; 
    
    let params = new Map();
    params.set('comand','GetUserInfo');
    params.set('ConfigName',drx);
    params.set('UserName',user);
    let  rest
    rest = XMLrequest(params)["Server"];
    let IP = rest;
    let LoginData = {
      ConfigName: drx,
      UserName: user,
      Password: password,
      WorkPlace: workplace,
      //Comp: "NPO5898",
    };
    params = new Map();
    params.set('comand','enter');
    if (IP !="")
    params.set('IP', IP);
    rest = XMLrequest(params,  LoginData);
    rest["error"]!== undefined? CheckAnswerFromServer(rest["error"]["Item"]): GoToMain(LoginLast)
    //let res = AxiosRequest(params, "post",LoginData)
    //res.then((responce)=>{console.log(responce)})
    /*
    axios.post(URL(params), JSON.stringify(LoginData)).then((response) => {
      setLoginAnswer(response.data);
      response.data["error"] !== undefined? CheckAnswerFromServer(response.data["error"]["Item"]): GoToMain()
    });*/
  };
  // let page = browser.extension.getBackgroundPage()

  return (
    <Container  maxWidth="xs"   >
      <CssBaseline />
      <img src={money} style={{ marginLeft:"30%"}}/>
      <Typography variant="h5" color={"#0098ad"} style={{ marginLeft:"30%"}}> WEB-СМЕТА</Typography>
      <Paper variant='elevation' elevation={10}  >
      
      <Box
          sx={{
            px: 3,
            pb: 3,
            pt:1,
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        spacing={3}
        // onKeyDown={handlekeyDownSignIn}
      >
        <Grid item xs>
          <Button
            style={{ marginTop: 10, backgroundColor: "#0098ad",textTransform:"none" }}
            type="submit"
            fullWidth
            variant="contained"
            className="ButtonMargin"
            // onClick={handleSingIn} 
            onClick={executeCertListAsXML}
            >

            Вход по ЭП

          </Button>
        </Grid>

        <SelectDrx drxInfo={drx} setBackInfo={setDrx} password={undefined} userInfo={undefined} KeyDown={handlekeyDownSignIn} />

        <SelectUser userInfo={user} drxInfo={drx} setBackInfo={setUser} password={undefined} KeyDown={handleSingIn} />

        <SelectWorkPlace  drxInfo={drx} userInfo={user} workPlaceInfo={workplace} setBackInfo={setWorkPlace} password={undefined}  KeyDown={handlekeyDownSignIn} />

       {/*  ПОТОМ СДЕЛАТЬ GETUSERINFO */}

        <Grid item xs>
          <TextField
            fullWidth
            // name="password"
            label="Пароль"
            type="password"
            // id="password"
            onChange={clientPasswordHandler}
            inputProps={{
              autoComplete: 'current-password',
            }}
            onKeyDown={handlekeyDownSignIn}
            value={password}
            
          />
        </Grid>
      
        <Grid item>
        
          <Button
            style={{backgroundColor: "#0098ad",textTransform:"none",}}
            type="submit"
            fullWidth
            variant="contained"
            className="ButtonMargin"
            onClick={handleSingIn}
            
          >
            Войти
          </Button>
        </Grid>
        <div style={{justifyContent:"center", alignItems:"center", display:"flex", color:"red"}}>{error !== null ? `${error}` : ""}</div>
      </Grid>
      </Box>
      </Paper>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </Container>
  );
};

export default SignIn;