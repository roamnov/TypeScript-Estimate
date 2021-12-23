import { Button, Grid, Tab, Tabs } from "@material-ui/core";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { IdToTree, TabPanelProps } from "../../../ComponentInterface";
import  {useState,useEffect } from "react";
import Tree from "./Tree/tree.js";
import { useStyles } from "../../../Styles";
import ResizePanel from "./ResizebleComponent/ResizebleComponent";
import ManWhoSoldTheWorld from "../../stimategrid/test";
import GridStimate from "../../stimategrid/GridTest";

//
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
          <Grid style={{  }}>
            {children}
          </Grid>
        )}
      </div>
    );
  }
  //

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  //

const SqlWindow =(props: IdToTree) =>{
    const classes = useStyles();
    const [code, setCode] = useState(    ``  );
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false)
    const [IDbd, setIDbd] = useState();
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight-205);

    const handleResize = () => {
      setCurrentHeight(window.innerHeight-205);
    }
    useEffect(() => {
      window.addEventListener("resize", handleResize, false);
    }, []);

    const openGrid= ()=>{
      setOpen(!open)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    return (
            

        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              xs
              
              >
        
          
        <ResizePanel   direction="e" style={{ width: '400px',  maxWidth: "80%" , paddingTop:"2%"}} >
         
          <Tree setCode={setCode} setIDbd={setIDbd} />           
          
        </ResizePanel>
   {/* */}

        {/*   */}    
       
          
        <Grid xs>
          <Grid  style={{}}>
          <Tabs value={value} onChange={handleChange} >
            <Tab onClick={openGrid} label="SQL-скрипты" {...a11yProps(1)} />
            <Tab label="Данные" {...a11yProps(0)} />
          </Tabs>
          </Grid>
            <TabPanel  value={value} index={0}>
              {/* УВЕЛИЧИТЬ ПОЛЕ ВВОДА, НЕ ХВАТАЕТ*/} 
              
            <div style={{overflow:"scroll",  height:`${currentHeight}px`    ,overflowX:"hidden",scrollbarWidth:"none" }}>
   
            <CodeEditor
                
                value={code}
                language="sql"
                placeholder="Please enter SQL code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={5}
                //minHeight={windowInnerHeight}
                style={{
                
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                
                }}
            />
            </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {open?ManWhoSoldTheWorld(IDbd):<Button  variant="outlined" onClick={openGrid}>Открыть</Button>}
                <div id="gridPanel" style={{position: 'relative', left: '0px', top: '0px', width: '100%', height:`${currentHeight}px`}} >  </div>
                {GridStimate()}
            </TabPanel>
        </Grid>
      </Grid>
            
    
    )
}

export default SqlWindow;

/*
disabled={IDbd === undefined}
*/