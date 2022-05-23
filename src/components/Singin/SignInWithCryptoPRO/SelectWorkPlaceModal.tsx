import React, { useEffect,  useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";




const SelectWorkPlaceModal = (props:any) => {  
  const [workspace, setWorkSpace] = useState(props.data);
  const [value, setValue] = React.useState<any>("");
  const [inputValue, setInputValue] = React.useState("");
  const [open, setOpen] = useState(false);  
  const [load, setLoad] = useState(true);
  const [LastDrx, setLastDrx] = useState("");

  useEffect(()=>{
    setLoad(true)
    if(props.drx === LastDrx){

    }else{
      setValue("");
      setLastDrx(props.drx)
    }
  },[props.drx])

  const ClickField=()=>{
    if(props.drx !== undefined){
        setLoad(false)
    }
    
  }


//   const OnKeyEnter=(e:any)=>{
//     if(e.keyCode === 13 && open ===false) {
//       props.KeyDown(e);
//     }else if(e.keyCode === 40 && open ===false) {
//     //   getDrx();
//     }
//   }

  function MenuItems(WPList: any) {
    let array = [], name:any;

    for (const [key, value] of Object.entries(WPList)) {
      name = value;
      if(name.Name === props.drx){
        props.setServer(name.Server)
        for (const [key, value] of Object.entries(name.Workplace)) {
            array.push(value)
        }
        
    }
    }
    return array;
  }

  return (
    <Grid item xs >
      <Autocomplete
        selectOnFocus
        loadingText={"Выберите конфигурацию"}
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
        id="workplace"
        options={MenuItems(props.json)}
        // onKeyDown={OnKeyEnter}
        renderInput={(params) => <TextField onClick={ClickField}  {...params} label="Конфигурация"  />}
        
      />
    </Grid>
  );
};

export default SelectWorkPlaceModal;