import React, {  useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [autoComplete, setAutoComplete] = useState("username");

  

  const getUser = () => {
      setLoad(true);
      let params = new Map();
      params.set('comand','getuserlist');
      params.set('ConfigName',props.drxInfo);
      setLoad(false)
      setUserList(XMLrequest(params));
      setAutoComplete("username");
  };

  const OnKeyEnter=(e:any)=>{
    if(e.keyCode === 13 && open ===false) {
      setAutoComplete("1");
      props.KeyDown(e);
    }else if(e.keyCode === 40 && open ===false) {
      getUser();
    }
  }

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
        // open={true}
        onOpen={(e:any)=>{
          setOpen(true);
        }}
        onClose={(e:any)=>{
          setOpen(false);
        }}
        disableListWrap={true}
        clearOnBlur
        selectOnFocus
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
        onKeyDown={OnKeyEnter}
        renderInput={(params) => (
          <TextField {...params}  autoComplete= {autoComplete} id={autoComplete} name={autoComplete}  onClick={getUser}  label="Имя пользователя" />
        )}
      />
    </Grid>
  );
};

export default SelectUser;