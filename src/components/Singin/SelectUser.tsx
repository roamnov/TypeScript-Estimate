import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useStyles } from "../Styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { componentProps, menuSelect } from "../ComponentInterface";
import axios from "axios";
import URL from "../Url";

const SelectUser = (props: menuSelect) => {
  const styles = useStyles();
  const [value, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState("");
  const [users, setUserList] = useState([]);


  const getUser = () => {
      let params = new Map();
      params.set('comand','getuserlist');
      params.set('ConfigName',props.drxInfo);
      axios.get(URL(params))
        .then((response) => {
          setUserList(response.data);
        });
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
          <TextField {...params} onClick={getUser} label="Имя пользователя" />
        )}
      />
    </Grid>
  );
};

export default SelectUser;
