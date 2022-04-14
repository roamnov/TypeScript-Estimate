import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import { menuSelect } from "../ComponentInterface";
import  { get_cookie, XMLrequest } from "../Url";

const SelectWorkPlace = (props: menuSelect) => {
  
  let LastWorkPlace = get_cookie("LastLogin").split(",");
  const [workplaces, setWorkPlaces] = useState([]);
  const [value, setValue] = React.useState<any>(LastWorkPlace === undefined? "": LastWorkPlace[2]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  
  function useOutsideAlerter(ref:any) {
    useEffect(() => {
    
      function handleClickOutside(event: { target: any; }) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
     
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const PopperMy = function (props:any) {
    return <Popper {...props}  placement="bottom-start" onClick={ChangeOpen} />;
  };

  const ChangeOpen = ()=>{
    setOpen(!open)
  }


  const getWorkPlaces = () => {
      setLoad(true);
      let params = new Map();
      params.set('comand','getworkplacelist');
      params.set('ConfigName',props.drxInfo);
      params.set('UserName',props.userInfo);
      setLoad(false)
      setWorkPlaces(XMLrequest(params));
        
  };

  const OnKeyEnter=(e:any)=>{
    if(e.keyCode === 13 && open ===false) {
      props.KeyDown(e);
    }else if(e.keyCode === 40 && open ===false) {
      getWorkPlaces();
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
 
        onOpen={(e:any)=>{
          setOpen(true);
        }}
        onClose={(e:any)=>{
          setOpen(false);
        }}
        loading={loading}
        loadingText={props.userInfo=== "" ?"Необходимо выбрать пользователя":<CircularProgress/>}
        freeSolo
        fullWidth
        disableClearable
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
        onKeyDown={OnKeyEnter}
        renderInput={(params) => <TextField onClick={getWorkPlaces}  autoComplete="off"     {...params} label="Рабочее место"   inputProps={{
          ...params.inputProps,
          autoComplete: 'tmntmemtemte',
        }}  />}
      />
      
    </Grid>
  );
};

export default SelectWorkPlace;