import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import { menuSelect } from "../ComponentInterface";
import  { get_cookie, XMLrequest } from "../Url";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
          if(event.target.id === "iconWP" || event.target.id ==="buttonWP" ||event.target.id === "WP"){

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
    return <Popper {...props}  placement="bottom-start" onClick={ChangeOpen} ref={wrapperRef} />;
  };

  const ChangeOpen = ()=>{
    setOpen(!open)
  }


  const getWorkPlaces = () => {
      setOpen(!open)
      setLoad(true);
      if(!open && props.userInfo !== "" && props.drxInfo !== ""){
        let params = new Map();
        params.set('comand','getworkplacelist');
        params.set('ConfigName',props.drxInfo);
        params.set('UserName',props.userInfo);
        setLoad(false)
        setWorkPlaces(XMLrequest(params));
      }
      
        
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
        open={open}
        PopperComponent={PopperMy}
        loading={loading}
        loadingText={props.userInfo=== "" || props.drxInfo === "" ?"Необходимо выбрать пользователя":<CircularProgress/>}
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
        id="WP"
        options={MenuItems(workplaces)}
        onKeyDown={OnKeyEnter}
        renderInput={(params) => <TextField autoComplete="off"     {...params} label="Рабочее место"   
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={getWorkPlaces} id={"buttonWP"}>
                  <ArrowDropDownIcon id={"iconWP"}/>
              </IconButton>
            </InputAdornment>
          )
        }}
        />}
      />
      
    </Grid>
  );
};

export default SelectWorkPlace;