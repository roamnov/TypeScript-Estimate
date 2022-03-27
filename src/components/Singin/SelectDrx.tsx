import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {  menuSelect } from "../ComponentInterface";

import  { get_cookie,XMLrequest } from "../Url";

const baseURL =
  "http://localhost:1317/mobile~project/getconfiglist?LicGUID=ED16868F4BEF468AC4DF0F8CB0E75D4A&All=0&All=0 HTTP/1.1";

const SelectDrx = (props: menuSelect) => {
  let LastDrx = get_cookie("LastLogin").split(",");
  
  const [drxconnect, setDrxServer] = useState([]);
  const [value, setValue] = React.useState<string | null>(LastDrx === undefined? "": LastDrx[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoad] = useState(true);
  const [open, setOpen] = useState(false);

  const getDrx = () => {
      setLoad(true);
      let params = new Map();
      params.set('comand','getconfiglist');
      //let test = AxiosRequest(params, "get")
      
      setLoad(false)
      setDrxServer(XMLrequest(params));
      
      /*
      axios.get(URL(params)).then((response) => {
        setDrxServer(response.data);
      });*/
        
  };

  const OnKeyEnter=(e:any)=>{
    if(e.keyCode === 13 && open ===false) {
      props.KeyDown(e);
    }else if(e.keyCode === 40 && open ===false) {
      getDrx();
    }
  }

  function MenuItems(drxList: any) {
    let array = [];

    for (const [key, value] of Object.entries(drxList)) {
      array.push(`${value}`);
    }
    return array;
  }

  return (
    <Grid item xs>
      <Autocomplete
        freeSolo
        onOpen={(e:any)=>{
          setOpen(true);
        }}
        onClose={(e:any)=>{
          setOpen(false);
        }}
        loading={loading}
        loadingText={<CircularProgress/>}
        fullWidth
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event: any, newInputValue: React.SetStateAction<string>) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        id="drx"
        options={MenuItems(drxconnect)}
        onKeyDown={OnKeyEnter}
        renderInput={(params) => <TextField   onClick={getDrx} {...params} label="Конфигурация" />}
      />
    </Grid>
  );
};

export default SelectDrx;