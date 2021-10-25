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

  const getWorkPlaces = () => {
    axios
      .get(
        URL(
          "getworkplacelist",
          `ConfigName=${props.drxInfo}&UserName=${props.userInfo}`
        )
      )
      .then((response) => {
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
        freeSolo
        fullWidth
        onSelect={getWorkPlaces}
        value={props.drxInfo}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        id="workplaces"
        options={MenuItems(workplaces)}
        renderInput={(params) => <TextField {...params} label="Рабочее место" />}
      />
    </Grid>
  );
};

export default SelectWorkPlace;
