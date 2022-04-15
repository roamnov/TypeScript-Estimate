import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {  menuSelect } from "../ComponentInterface";
import  { get_cookie,XMLrequest } from "../Url";
import Popper from "@mui/material/Popper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const baseURL =
  "http://localhost:1317/mobile~project/getconfiglist?LicGUID=ED16868F4BEF468AC4DF0F8CB0E75D4A&All=0&All=0 HTTP/1.1";

const SelectDrx = (props: menuSelect) => {
  let LastDrx = get_cookie("LastLogin").split(",");
  
  const [drxconnect, setDrxServer] = useState([]);
  const [value, setValue] = React.useState<any>(LastDrx === undefined? "": LastDrx[0]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  
  function useOutsideAlerter(ref:any) {
    useEffect(() => {
    
      function handleClickOutside(event: { target: any; }) {
        if (ref.current && !ref.current.contains(event.target)) {
          if(event.target.id === "iconDRX" || event.target.id ==="buttonDRX" ||event.target.id === "drx"){

          }else{
            setOpen(false);
          }
        }
      }
     
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const PopperMy = function (props:any) {
    return <Popper {...props}  placement="bottom-start" onClick={ChangeOpen} ref={wrapperRef}/>;
  };

  const ChangeOpen = ()=>{
    setOpen(!open)
  }


  const getDrx = () => {
      setOpen(!open)
      setLoad(true);
      if(!open){
        let params = new Map();
        params.set('comand','getconfiglist');
        setDrxServer(XMLrequest(params));
        setLoad(false)
      }
      
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
        open={open}
        freeSolo
        selectOnFocus
        disableClearable
        PopperComponent={PopperMy}
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
        renderInput={(params) => <TextField   {...params} label="Конфигурация"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={getDrx} id={"buttonDRX"}>
                  <ArrowDropDownIcon id={"iconDRX"}/>
              </IconButton>
            </InputAdornment>
          )
        }}
        />}
        
      />
    </Grid>
  );
};

export default SelectDrx;