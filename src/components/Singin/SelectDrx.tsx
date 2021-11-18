import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { componentProps, menuSelect } from "../ComponentInterface";
import axios from "axios";
import URL from "../Url";

const baseURL =
  "http://localhost:1317/mobile~project/getconfiglist?LicGUID=ED16868F4BEF468AC4DF0F8CB0E75D4A&All=0&All=0 HTTP/1.1";

const SelectDrx = (props: menuSelect) => {
  
  const [drxconnect, setDrxServer] = useState([]);
  const [value, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState("");

  const getDrx = () => {
      let params = new Map();
      params.set('comand','getconfiglist');
      axios.get(URL(params)).then((response) => {
        setDrxServer(response.data);
      });
        
  };

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
        fullWidth
        value={props.drxInfo}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        id="drx"
        options={MenuItems(drxconnect)}
        renderInput={(params) => <TextField onClick={getDrx} {...params} label="Конфигурация" />}
      />
    </Grid>
  );
};

export default SelectDrx;
