import  {  useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
//стили и интерфейсы пропсов
import { useStyles } from "../Styles";
import money from "../../static/images/money.png"
//копмпоненты
import SelectDrx from "./SelectDrx";
import SelectUser from "./SelectUser";
import SelectWorkPlace from "./SelectWorkPlace";
import {  CreateCokies, XMLrequest } from "../Url";
import {  useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import SignInDialog from "../Containers/SignInDialog";
import ReactDOM from "react-dom";
import axios from "axios";
import URL from "../Url";
import ModalSignIn from "./SignInWithCryptoPRO/ModalSignIn";
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


window.addEventListener("message", (messageEvent) => {
  if (WORKSPACE_RESPONSE_TYPE == messageEvent.data.type) {
      var response = messageEvent.data;
      var JSX
      let json
      switch (response.requestId) {
        
          case CertUIDAsXML:// УСПЕХ
              if(response.successful === false){
                JSX = <SignInDialog title={"Ошибка"} contentText={response.result}/>
              }else{
                // JSX = <SignInDialog title={"Успешно"} contentText={response.result}/>
                let params = new Map;
                let LoginData = {
                  "Pkcs7Auth-Answer":{
                    "Answer":response.result
                  }
                };
                params.set("comand", "answer");
                json =XMLrequest(params, LoginData);
                JSX = <ModalSignIn data={json} />
              } 
              ReactDOM.render(JSX,document.getElementById('renderSignIn'))
              
              break;
      };

  }
}, false);




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
  const [secret, setSecret] = useState("");
  
  var CERTS_XML_KEY = "certList";

  function executeCertListAsXML() {
    let params= new Map, json:any
    params.set("comand","secret")
    json = XMLrequest(params);
    CertUIDAsXML = uuid()    
    sendRequest(
        {
          type: "workspace-request",
          requestId: CertUIDAsXML, 
          params: {
              command: "sign",
              data: json["Pkcs7Auth-Secret"].Secret,
              format:"CMS",
              serialNumber: null,
              type: "detached"
            }
        });
    
  }

 

  
  
  function sendRequest(request:any) {
    window.postMessage(request, "*");
  }
  
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }
    

  //const ThemeContext = React.createContext('light');

  const GoToMain =(jsonEnter: any)=>{
    
    // console.log(jsonEnter["AppName"])
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
    <Container  maxWidth="xs" >
      <CssBaseline />
      <img src={money} style={{ marginLeft:"30%"}}/>
      <Typography variant="h5" color={"#0098ad"} style={{ marginLeft:"30%"}}> WEB-СМЕТА</Typography>
      <Paper variant='elevation' elevation={10}  >
      
      <Box sx={{
                px: 3,
                pb: 3,
                pt:1,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }} >
          
      <Grid  container  direction="column" justifyContent="space-around"    alignItems="stretch" spacing={3} >  
      
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
        <Grid id="renderSignIn">

        </Grid>
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