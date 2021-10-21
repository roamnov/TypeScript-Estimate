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

const SignIn = (props: componentProps) => {
  const styles = useStyles();

  let history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [loginAnswer, setLoginAnswer] = useState("");
  const [drx, setDrx] = useState();
  const [user, setUser] = useState();
  const [workplace, setWorkPlace] = useState();
  const [password, setPassword] = useState();
  const [open, setOpen] = React.useState(true);
  console.log(drx, user, workplace, password);

  //<Result ConfigName="шурышкульт.drx" UserName="Администратор" Obfuscate="1" Password="B" WorkPlace="Администратор" Comp="NPO5898"/>

  const handleSingOut = (event: any) => {
    axios.get(URL("leave", "smart=1")).then((response) => {
      console.log(response.data);
    });
  };

  function CheckAnswerFromServer(answer?: Object) {
    let test: string;
    test = JSON.stringify(answer);
    console.log(test);
    if (test.search("Пароль неверный") !== -1) {
      console.log("Неверный пароль func");
      return false;
    } else {
      history.push("/main");
      console.log("Успешный вход func");
      return true;
    }
  }

  const handleSingIn = (event: any) => {
    /* 
                  ConfigName": "шурышкульт.drx", 
                  "UserName": "Администратор",
                  
                  "Password": "1",
                  "WorkPlace": "Администратор",
                  "Comp":"NPO5898",
    */
    let testo = {
      ConfigName: drx,
      UserName: user,

      Password: password,
      WorkPlace: workplace,
      Comp: "NPO5898",
    };

    axios.post(URL("enter"), JSON.stringify(testo)).then((response) => {
      setLoginAnswer(response.data);
      CheckAnswerFromServer(response.data);

      console.log(response.data);
    });
  };
  if (redirect) {
    <Redirect to="/main" />;
  }
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
      </Grid>
    </Container>
  );
};

export default SignIn;
