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
import { menuSelect } from "../ComponentInterface";
import axios from "axios";
import URL from "../Url";

const SelectWorkPlace = (props: menuSelect) => {
  const styles = useStyles();

  const [workplaces, setWorkPlaces] = useState([]);
  const [value, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState("");

  const getWorkPlaces = (event:any) => {
      let params = new Map();
      params.set('comand','getworkplacelist');
      params.set('ConfigName',props.drxInfo);
      params.set('UserName',props.userInfo);
      axios.get(URL(params)).then((response) => {
          setWorkPlaces(response.data);
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
        id="workplaces"
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
