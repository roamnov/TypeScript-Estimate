import React, {useEffect, useState} from "react";
import { Paper, Grid, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useStyles} from "../Styles";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {componentProps, menuSelect} from "../ComponentInterface";
import axios from 'axios'
import URL from "../Url";




const SelectUser= (props : menuSelect)=>{
    const styles = useStyles();
    const [user, setUser] = useState('');
    const [users, setUserList] = useState([]);

    React.useEffect(() => {
        axios.get(URL('getuserlist',`ConfigName=${props.drxInfo}`)).then((response) => {
            setUserList(response.data);
            
            });
        }, [props.drxInfo]);

    function MenuItems(userList:any) {
        let array = [];
    
        for (const [key, value] of Object.entries(userList)) {
            array.push(`${value}`);  
        }
        return(
            array.map((nameUserList:React.ReactFragment, key ) => { 
            return(
            <MenuItem key={key} value={key}>{nameUserList}</MenuItem> );
            }
            ))
        }
    function BackValue(userList:any,valuee: any){
        return userList[`item${valuee}`]}

    const handleChange = (event: SelectChangeEvent) => {
        props.setBackInfo(BackValue(users, event.target.value))
    };

    return(
        <Grid item xs> 
        <FormControl fullWidth className={styles.formControl}>
            <InputLabel id="demo-simple-select-label">Имя пользователя</InputLabel>
              <Select  value={props.userInfo} onChange={handleChange}  >
                {MenuItems(users)}
              </Select>
          </FormControl>
      </Grid>
    )
}

export default SelectUser;