import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";




const SelectDrxModal = (props:any) => {

  const [drxconnect, setDrxServer] = useState([]);
  const [value, setValue] = React.useState<any>("");
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = useState(false);


//   const OnKeyEnter=(e:any)=>{
//     if(e.keyCode === 13 && open ===false) {
//       props.KeyDown(e);
//     }else if(e.keyCode === 40 && open ===false) {
//     //   getDrx();
//     }
//   }

  function MenuItems(drxList: any) {
    let array = [], name:any;
    for (const [key, value] of Object.entries(drxList)) {
      name = value;
      array.push(name["Name"] );
    }
    return array;
  }

  return (
    <Grid item xs >
      <Autocomplete
        selectOnFocus
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
        options={MenuItems(props.json)}
        // onKeyDown={OnKeyEnter}
        renderInput={(params) => <TextField   {...params} label="Конфигурация"  />}
        
      />
    </Grid>
  );
};

export default SelectDrxModal;