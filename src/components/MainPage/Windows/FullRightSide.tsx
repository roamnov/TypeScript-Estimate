import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './ViewData/SqlWindow';
import { IdToTree, TabPanelProps } from "../../ComponentInterface";
//import init from "../stimweb/tools"
import Init from '../test';
import { isTemplateSpan } from 'typescript';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{  }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FullRightSide(props: IdToTree) {


  const [id, setID] = React.useState();
  const [name, setName] = React.useState();
  const [currentTab, setcurrentTab] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [howManyTabs, setHowManyTabs] = React.useState(['Личный кабинет'])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const addTabs= () =>{
    
    
    setHowManyTabs([...howManyTabs, "test"])
    /*
    */
  }

  const TabsReturn =(tab?: any) =>{
    return tab.map((name: number,key: number)=>{
      name = name + key
      return(
        
        <Tab label={name} {...a11yProps(key)} />
      )
    })
  }

  const TabPanelReturn = (tab?: any) =>{
    return tab.map((name: number,key: number)=>{
      name = name + key
      return(
        
        <TabPanel value={value} index={key}>
          {key}
      </TabPanel> 
      )
    })
  }

  return (
    
    <Grid container 
    direction="column" 
    justifyContent="center" 
    component="main" 
    sx={{ flexGrow: 1, pt: 2, pl:2 }}  
    alignItems="stretch"
    
    >
    
    <Grid item direction="column" style={{backgroundColor:"blueviolet"}}>
    <Toolbar />
      Верхушка(меню)
    </Grid>
    <Grid item direction="column" style={{}} >
      <Button onClick={addTabs}> Добавить вкладку</Button>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {TabsReturn(howManyTabs)}
      </Tabs>
    </Grid>  
    <TabPanel value={value} index={0}>
       {props.ID !== undefined && props.Name == "Просмотр данных"? <SqlWindow Name={name} ID={id} /> : <div></div>}
    </TabPanel>
      {TabPanelReturn(howManyTabs)}
  </Grid>
  );
}

/*
<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
*/
