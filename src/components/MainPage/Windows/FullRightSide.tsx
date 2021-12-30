import * as React from 'react';
import { Button, Grid, Toolbar } from '@material-ui/core';
import SqlWindow from './ViewData/SqlWindow';
import { IdToTree, InfoAboutClick, TabPanelProps,InfoAboutClickDown } from "../../ComponentInterface";
//import init from "../stimweb/tools"
//import Init from '../stimategrid/test';
import SectionTools from '../Tools/SectionTools';
import DocTabs from './Tabs/CustomTabs';
import ManWhoSoldTheWorld from '../stimategrid/test';
import DocsReportsMainWindow from './Docs&Reports/Docs&ReportsWindow';
//import NestedMenu from '../Tools/NestedMenu';
import { WorkPlaceTools } from '../Tools/WorkPlaceTools';
import StickyFooter from '../NotWorkArea(Side&Head)/Footer';


export default function FullRightSide(props: InfoAboutClick) {

  const [open, setOpen] = React.useState(false);
  const [selected,setSelected] = React.useState<InfoAboutClick | undefined>()
  const [currentTab, setcurrentTab] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const [sectionToolsData, setSectionToolsData] = React.useState();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const openGrid= ()=>{
    setOpen(!open)
  }


  const getTabs = ()=>{
    if(props.id !== undefined && props.clsic  == "{A759DBA0-9FA2-11D5-B97A-C2A4095B2C3B}"){
      
      return DocTabs(props.name, props.id, document.getElementById("WorkPlace"), <SqlWindow CLSID={props.clsic} ID={props.id} />) 
    }
    if(props.id !== undefined){
      return DocTabs(props.name, props.id, document.getElementById("WorkPlace"), <DocsReportsMainWindow id={props.id}/>) 
    }
  }


  return (
    
    <Grid container 
          direction="column" 
          justifyContent="center" 
          sx={{ flexGrow: 1, pt: 2 }}  
          alignItems="stretch" 
          >
    
    <Grid item  >
      <Toolbar />
      {props.isLoading?<div></div>:<><WorkPlaceTools/> <SectionTools setChildren={setSectionToolsData}/> </>}
        
    </Grid>
    
    <Grid item xs    >
      <div  style={{ paddingLeft: "0.85%"}}>
        <div id ="WorkPlace">

        </div>
        <div>
        <StickyFooter value={sectionToolsData}/>
        </div>
      </div>
     
      {getTabs()}
      
    </Grid> 

  </Grid>
  );
}

/*
{getTabs()}

 {open?ManWhoSoldTheWorld():<button onClick={openGrid}>Открыть</button>}
       <div id="gridPanel" style={{position: 'relative', left: '0px', top: '0px', width: '100%', height: '100%'}} >  </div>


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
