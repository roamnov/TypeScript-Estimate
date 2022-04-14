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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  
  function useOutsideAlerter(ref:any) {
    useEffect(() => {
    
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          if(event.target.id === "iconUser" || event.target.id ==="buttonUser" ||event.target.id === "username"){

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
    <Grid item xs id="userGrid">
      <Autocomplete
        open={open}
        PopperComponent={PopperMy}
        disableListWrap={true}
        selectOnFocus
        freeSolo
        fullWidth
        loading={loading}
        loadingText={props.drxInfo === "" ?"Необходимо выбрать конифгурацию":<CircularProgress/>}
        value={value}
        disableClearable
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        id="username"
        options={MenuItems(users)}
        onKeyDown={OnKeyEnter}
        renderInput={(params) => (
          <TextField {...params}   autoComplete="username" name="username"   label="Имя пользователя" style={{paddingRight:0}} 
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={getUser} id={"buttonUser"}>
                    <ArrowDropDownIcon id={"iconUser"}/>
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