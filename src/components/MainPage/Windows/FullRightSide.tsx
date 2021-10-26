import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './SqlWindow';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

export default function FullRightSide() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Grid item direction="column" style={{backgroundColor:"blue"}} >
      Хлебные крошки
    </Grid>
      <Grid container item
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      xs
      >
        <Grid xs={2} style={{backgroundColor:"red"}} >
            a
        </Grid>
        <Grid  xs={10} >
          <Grid direction={'column'} style={{}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Данные" {...a11yProps(0)} />
            <Tab label="SQL-скрипты" {...a11yProps(1)} />
            </Tabs>
          </Grid>
            <TabPanel value={value} index={1}>
            <SqlWindow/>
            </TabPanel>
        </Grid>
      </Grid>
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
