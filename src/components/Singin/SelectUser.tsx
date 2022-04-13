import React, {  useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { menuSelect } from "../ComponentInterface";
import { get_cookie, XMLrequest } from "../Url";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Popper from "@mui/material/Popper";

const SelectUser = (props: menuSelect) => {

  let LastUser = get_cookie("LastLogin").split(",");
  const [value, setValue] = React.useState<any>(LastUser === undefined? "": LastUser[1]);
  const [inputValue, setInputValue] = React.useState("");
  const [users, setUserList] = useState([]);
  const [loading, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [autoComplete, setAutoComplete] = useState("username");
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
    return <Popper {...props}  placement="bottom-start"   />;
 };

  const getUser = () => {
    setOpen(!open);
    setLoad(true);
    let params = new Map();
    params.set('comand','getuserlist');
    params.set('ConfigName',props.drxInfo);
    setLoad(false)
    setUserList(XMLrequest(params));
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
        open={open}
        
        disableListWrap={true}
        clearOnBlur
        selectOnFocus
        freeSolo
        fullWidth
        loading={loading}
        loadingText={props.drxInfo === "" ?"Необходимо выбрать конифгурацию":<CircularProgress/>}
        value={value}
        disableClearable
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          setOpen(false)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        
        options={MenuItems(users)}
        onKeyDown={OnKeyEnter}
        renderInput={(params) => (
          <TextField {...params}   id="username" autoComplete="username" name="username"   label="Имя пользователя" style={{paddingRight:0}} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={getUser}>
                    <ArrowDropDownIcon/>
                </IconButton>
              </InputAdornment>
            )
          }}
          />
        )}
      />
      {}
    </Grid>
  );
};

export default SelectUser;