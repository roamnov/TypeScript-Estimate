import { Box, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import { padding } from "@material-ui/system";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { IdToTree, TabPanelProps } from "../../../ComponentInterface";
import React, { createElement, useCallback, useEffect, useState } from "react";
import Tree from "./Tree/tree.js";
import ResizableComponent from "./ResizebleComponent";
import { useStyles } from "../../../Styles";
import ResizePanel from "./ResizebleComponent";


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
  

const SqlWindow =(props: IdToTree) =>{
    const classes = useStyles();
    const [code, setCode] = React.useState(    ``  );
    const [value, setValue] = React.useState(0);



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      };
    return (
            

        <Grid container item
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              xs
              >
        
         
        <ResizePanel direction="e" style={{ width: '400px' }} >
          
            <Tree/>
          
        </ResizePanel>
    
           
         
        
        
        <Grid xs>
          <Grid direction={'column'} style={{}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Данные" {...a11yProps(0)} />
            <Tab label="SQL-скрипты" {...a11yProps(1)} />
          </Tabs>
          </Grid>
            <TabPanel value={value} index={1}>
            <CodeEditor
                
                value={code}
                language="sql"
                placeholder="Please enter SQL code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={5}
                
                style={{
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                height: "100vh",
                }}
            />
            </TabPanel>
        </Grid>
      </Grid>
            
    
    )
}

export default SqlWindow;