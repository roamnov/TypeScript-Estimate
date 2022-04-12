import React, {  useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { menuSelect } from "../ComponentInterface";
import { get_cookie, XMLrequest } from "../Url";

const SelectUser = (props: menuSelect) => {

  let LastUser = get_cookie("LastLogin").split(",");
  const [value, setValue] = React.useState<string | null>(LastUser === undefined? "": LastUser[1]);
  const [inputValue, setInputValue] = React.useState("");
  const [users, setUserList] = useState([]);
  const [loading, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [autoComplete, setAutoComplete] = useState("username");

  // function Check(){
  //   if(open === true){
  //     setAutoComplete("username");
  //   }else{
  //     setAutoComplete("sdadsadasdda");
  //   }
  // }

  const getUser = () => {
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
        // open={true}
        onOpen={(e:any)=>{
          setOpen(true);
        }}
        onClose={(e:any)=>{
          setOpen(false);
        }}
        disableListWrap={true}
        clearOnBlur
        selectOnFocus
        freeSolo
        fullWidth
        loading={loading}
        loadingText={props.drxInfo === "" ?"Необходимо выбрать конифгурацию":<CircularProgress/>}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.setBackInfo(newInputValue);
          setInputValue(newInputValue);
        }}
        
        options={MenuItems(users)}
        onKeyDown={OnKeyEnter}
        renderInput={(params) => (
          <TextField {...params}  id="username" autoComplete="username" name="username"  onClick={getUser}  label="Имя пользователя" />
        )}
      />
      {}
    </Grid>
  );
};

export default SelectUser;