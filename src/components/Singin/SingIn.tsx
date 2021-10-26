import React, { useState } from "react";
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
} from "@material-ui/core";
//стили и интерфейсы пропсов
import { useStyles } from "../Styles";
import { componentProps } from "../ComponentInterface";
//копмпоненты
import SelectDrx from "./SelectDrx";
import SelectUser from "./SelectUser";
import SelectWorkPlace from "./SelectWorkPlace";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import URL from "../Url";
import AlertPassword from "./AlertPassword";
import { red } from "@material-ui/core/colors";
import { Link, Redirect, useHistory } from "react-router-dom";

export const LoginIn = React.createContext(false);
 LoginIn.displayName = "false";
 export const stas = false;

const SignIn = (props: componentProps) => {
  const styles = useStyles();

  
  let history = useHistory();
  const [error, setError] = useState<string | null>("");
  const [loginAnswer, setLoginAnswer] = useState("");
  const [drx, setDrx] = useState("");
  const [user, setUser] = useState("");
  const [workplace, setWorkPlace] = useState("");
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(true);
  //console.log(drx, user, workplace, password);

  //<Result ConfigName="шурышкульт.drx" UserName="Администратор" Obfuscate="1" Password="B" WorkPlace="Администратор" Comp="NPO5898"/>

  const ThemeContext = React.createContext('light');

  const GoToMain =()=>{
    LoginIn.displayName = "true";
    history.push("/main");
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

  const handleSingIn = (event: any) => {
    let LoginData = {
      ConfigName: drx,
      UserName: user,

      Password: password,
      WorkPlace: workplace,
      //Comp: "NPO5898",
    };

    axios.post(URL("enter"), JSON.stringify(LoginData)).then((response) => {
      setLoginAnswer(response.data);
      response.data["error"] !== undefined
        ? CheckAnswerFromServer(response.data["error"]["Item"])
        : GoToMain()
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {}
      <Grid
        container
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        xs
        spacing={2}
      >
        <Grid item xs>
          <Button
            style={{ marginTop: 10 }}
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

        <SelectWorkPlace
          drxInfo={drx}
          userInfo={user}
          workPlaceInfo={workplace}
          setBackInfo={setWorkPlace}
        />

        {/* ПОТОМ СДЕЛАТЬ GETUSERINFO */}

        <Grid item xs>
          <PasswordInput password={password} setBackInfo={setPassword} />
        </Grid>
        {}
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="ButtonMargin"
            onClick={handleSingIn}
          >
            Войти
          </Button>
        </Grid>
        <div>{error !== null ? `${error}` : ""}</div>
      </Grid>
    </Container>
  );
};

export default SignIn;
