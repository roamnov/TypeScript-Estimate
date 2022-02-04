import React, { useState } from "react";
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

const SelectWorkPlace = (props: menuSelect) => {
  
  let LastWorkPlace = get_cookie("LastLogin").split(",");
  const [workplaces, setWorkPlaces] = useState([]);
  const [value, setValue] = React.useState<string | null>(LastWorkPlace === undefined? "": LastWorkPlace[2]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoad] = useState(true);

  const getWorkPlaces = (event:any) => {
      setLoad(true);
      let params = new Map();
      params.set('comand','getworkplacelist');
      params.set('ConfigName',props.drxInfo);
      params.set('UserName',props.userInfo);
      setLoad(false)
      setWorkPlaces(XMLrequest(params));
        
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
        loading={loading}
        loadingText={props.userInfo=== "" ?"Необходимо выбрать пользователя":<CircularProgress/>}
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
        
        options={MenuItems(workplaces)}
        renderInput={(params) => <TextField onClick={getWorkPlaces} {...params} label="Рабочее место" />}
      />
      
    </Grid>
  );
};

export default SelectWorkPlace;
