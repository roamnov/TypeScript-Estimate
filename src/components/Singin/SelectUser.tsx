import React, {  useState } from "react";
import {
  Grid,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useStyles } from "../Styles";
import { menuSelect } from "../ComponentInterface";
import axios from "axios";
import URL, { get_cookie, XMLrequest } from "../Url";

const SelectUser = (props: menuSelect) => {

  let LastUser = get_cookie("LastLogin").split(",");
  const [value, setValue] = React.useState<string | null>(LastUser === undefined? "": LastUser[1]);
  const [inputValue, setInputValue] = React.useState("");
  const [users, setUserList] = useState([]);
  const [loading, setLoad] = useState(true);


  const getUser = () => {
      setLoad(true);
      let params = new Map();
      params.set('comand','getuserlist');
      params.set('ConfigName',props.drxInfo);
      setLoad(false)
      setUserList(XMLrequest(params));
      
  };

  function MenuItems(userList: any) {
    let array = [];

    for (const [key, value] of Object.entries(userList)) {
      array.push(`${value}`);
    }
    return array;
  }
 
  return (
    <Grid item xs>
      <Autocomplete
        
        freeSolo
        fullWidth
        loading={loading}
        loadingText={props.drxInfo === "" ?"Необходимо выбрать конифгурацию":<CircularProgress/>}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        
        options={MenuItems(users)}
        renderInput={(params) => (
          <TextField {...params} autoComplete="username" id="username" name="username" inputProps={{  ...params.inputProps, autoComplete: 'username', }} onClick={getUser}  label="Имя пользователя" />
        )}
      />
    </Grid>
  );
};

export default SelectUser;
