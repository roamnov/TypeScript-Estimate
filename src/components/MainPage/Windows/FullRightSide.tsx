import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './ViewData/SqlWindow';
import { IdToTree, InfoAboutClick, TabPanelProps,InfoAboutClickDown } from "../../ComponentInterface";
//import init from "../stimweb/tools"
import Init from '../stimategrid/test';
import { isTemplateSpan } from 'typescript';
import { TabsDemo } from './Tabs/ClosableTabs';
import { BrowserRouter } from 'react-router-dom';
import BasicBreadcrumbs from './Breadcrumbs';
import SectionTools from './SectionTools';

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

export default function FullRightSide(props: InfoAboutClick) {

  const [selected,setSelected] = React.useState<InfoAboutClick | undefined>()
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

  const tabs = [
    {
      id: 1,
      label: "Tab 1",
      component: props.id !== undefined && props.clsic  == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}"? <SqlWindow CLSID={props.clsic} ID={props.id} /> : <div></div>,
      closeable: false
    },
    {
      id: 2,
      label: "Tab 2",
      component: <div/>,
      closeable: true
    },
    {
      id: 3,
      label: "Tab 3",
      component: <div/>,
      closeable: true
    }
  ];

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
    
    <Grid item direction="column" >
    <Toolbar />
      {props.isLoading?<div></div>:<><SectionTools/></>}
      
    </Grid>
    <BasicBreadcrumbs/>
    <Grid item direction="column" style={{}} >
      <TabsDemo tabs={tabs} onClose={undefined} />
    </Grid>  
    
      {TabPanelReturn(howManyTabs)}
    
  </Grid>
  );
}

/*

props.ID !== undefined && props.CLSID == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}"? <SqlWindow CLSID={clsid} ID={id} /> : 

<Button onClick={addTabs}> Добавить вкладку</Button>
<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              {TabsReturn(howManyTabs)}
      </Tabs>

 <TabPanel value={value} index={0}>
{Просмотр данных*} {props.ID !== undefined && props.CLSID == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}"? <SqlWindow CLSID={clsid} ID={id} /> : <div></div>}
</TabPanel>



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
