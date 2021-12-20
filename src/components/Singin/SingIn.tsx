import React, { useState } from "react";
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
import { componentProps } from "../ComponentInterface";
import money from "../../static/images/money.png"
//копмпоненты
import SelectDrx from "./SelectDrx";
import SelectUser from "./SelectUser";
import SelectWorkPlace from "./SelectWorkPlace";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import URL from "../Url";
import { purple, red } from "@material-ui/core/colors";
import { Link,  useNavigate } from "react-router-dom";
import { LoginIn } from "../Wrapper";





const SignIn = (props: componentProps) => {
  const styles = useStyles();

  
  let navigate = useNavigate();
  const [authtoken, setAutnToken] = useLocalStorage(false, "auth")
  const [error, setError] = useState<string | null>("");
  const [loginAnswer, setLoginAnswer] = useState("");
  const [drx, setDrx] = useState("");
  const [user, setUser] = useState("");
  const [workplace, setWorkPlace] = useState("");
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(true);
 
  

  const ThemeContext = React.createContext('light');

  const GoToMain =()=>{
    //useLocalStorage(drx, "drx")
    setAutnToken(true, "auth")
    navigate("main");
  }

  function CheckAnswerFromServer(answer?: Object) {
    let test: string;

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


  const handleSingIn = () => {
    let LoginData = {
      ConfigName: drx,
      UserName: user,
      Password: password,
      WorkPlace: workplace,
      //Comp: "NPO5898",
    };
    let params = new Map();
    params.set('comand','enter');
    axios.post(URL(params), JSON.stringify(LoginData)).then((response) => {
      setLoginAnswer(response.data);
      response.data["error"] !== undefined? CheckAnswerFromServer(response.data["error"]["Item"]): GoToMain()
    });
  };

  return (
    <Container  maxWidth="xs"  >
      
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
      >
        <Grid item xs>
          <Button
            style={{ marginTop: 10, backgroundColor: "#0098ad" }}
            type="submit"
            fullWidth
            variant="contained"
            className="ButtonMargin"
            onClick={handleSingIn}
            
          >
            Вход по ЭП
          </Button>
        </Grid>

        <SelectDrx drxInfo={drx} setBackInfo={setDrx} />

        <SelectUser userInfo={user} drxInfo={drx} setBackInfo={setUser} />

        <SelectWorkPlace  drxInfo={drx}  userInfo={user}  workPlaceInfo={workplace}  setBackInfo={setWorkPlace}   />

       {/*  ПОТОМ СДЕЛАТЬ GETUSERINFO */}

        <Grid item xs>
          <PasswordInput password={password} setBackInfo={setPassword} />
        </Grid>
      
        <Grid item>
          
          <Button
          style={{backgroundColor: "#0098ad"}}
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
    </Container>
  );
};

export default SignIn;
