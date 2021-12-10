import React, {useEffect, useState} from "react";
import { Paper, Grid, MenuItem, FormControl, InputLabel} from "@mui/material";
import {useStyles} from "../Styles";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {componentProps, menuSelect} from "../ComponentInterface";
import axios from 'axios'
import URL from "../Url";

const baseURL = 'http://localhost:1317/mobile~project/getconfiglist?LicGUID=ED16868F4BEF468AC4DF0F8CB0E75D4A&All=0&All=0 HTTP/1.1';


const SelectDrx =(props : menuSelect) => {

 
  const styles = useStyles();
  const [drxconnect, setDrxServer] = useState([]);
  const [drx, setDRX] = useState('');
  
  

  React.useEffect(() => {
    axios.get(URL('getconfiglist','')).then((response) => {
      setDrxServer(response.data);
        });
      }, []);


  

  function MenuItems(drxList:any) {
    let array = [];

    for (const [key, value] of Object.entries(drxList)) {
      array.push(`${value}`);  
    }
    return(
      array.map((nameDrx:React.ReactFragment, key ) => { 
      return(
        <MenuItem key={key} value={key}>{nameDrx}</MenuItem> );
        }
      ))
  }
  function BackValue(drxList:any,valuee: any){
    return drxList[`item${valuee}`]}

  const handleChange = (event: SelectChangeEvent) => {      
      props.setBackInfo(BackValue(drxconnect, event.target.value))
    };

  return(
    <Grid item xs> 
        <FormControl fullWidth className={styles.formControl}>
            <InputLabel>Конфигурация</InputLabel>
              <Select  value={props.drxInfo} onChange={handleChange}  >
                {MenuItems(drxconnect)}
                <MenuItem value={30}>ыфы</MenuItem>
              </Select>
          </FormControl>
      </Grid>
  );
}

export default SelectDrx;
