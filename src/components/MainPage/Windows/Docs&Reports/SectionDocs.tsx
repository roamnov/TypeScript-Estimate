import Grid from "@mui/material/Grid"
import  Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import { useState, useEffect } from "react";
import { DocsAndReports } from "../../../ComponentInterface";
import { XMLrequest } from "../../../Url";



const SectionDocs= (props:DocsAndReports) =>{

    const [sectionDocs, setSetionDocs] = useState([]);
    const windowInnerHeight = window.innerHeight - 80 
    console.log(windowInnerHeight)
    useEffect(() => {
        setActiveSession();
        initContext();
        setActiveSite();
        setActiveSite();
        getSectionDocs();

    }, [])

    const setActiveSession= ()=>{
        let params = new Map();
        params.set('prefix','project'); 
        params.set('comand','SetActiveSection');
        params.set('SectionID',props.id);
        XMLrequest(params)
    }
    const initContext = ()=>{ //GET /documents~InitContext?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7&LazyMemos=1 HTTP/1.1
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','InitContext');
        XMLrequest(params)
        
    }
    
    const setActiveSite= ()=>{//GET /documents~SetActiveSite?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7 HTTP/1.1
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','SetActiveSite');
        XMLrequest(params)
    }
    
    //GET /tools~GetSectionTools?LicGUID=E2365CAC4CE2CFD8F60C3C857AD2E1F7&SectionID=136 HTTP/1.1 потом
    const getSectionDocs = ()=>{
        let params = new Map();
        params.set('prefix','documents'); 
        params.set('comand','GetSectionDocs');
        params.set('SectionID',props.id);
        
            setSetionDocs(XMLrequest(params))
    
    }


    const ListSecond=(sectionDoc: any)=>{
        let items= [], Name, DocCfgID
        for (const [key, value] of Object.entries(sectionDoc)) {
            Name = sectionDoc[key]["Name"]
            DocCfgID = sectionDoc[key]["DocCfgID"]
            items.push(
          
                <Button style={{wordWrap:"normal",}} sx={{p:'0px',margin: "0.3%", width:"200px", height:"70px"}} variant="outlined"> {Name}</Button>
                
            )
        }

        return items
    }

    return(
        
            <div >
            <Typography variant="h5" sx={{margin: "0.3%"}}>
                Документы:
                <Grid container direction="row"  justifyContent="flex-start"alignItems="flex-start" sx={{paddingLeft:"10%"}}>
                    {ListSecond(sectionDocs)}  
                </Grid>
            </Typography>
            
            
            </div>
     
    )
}


export default SectionDocs;

/*

<Card sx={{}}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {Name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>


    const ListSecond=(sectionDoc: any)=>{
        let items= [], Name, DocCfgID
        for (const [key, value] of Object.entries(sectionDoc)) {
            Name = sectionDoc[key]["Name"]
            DocCfgID = sectionDoc[key]["DocCfgID"]
            items.push(
                
                <ListItemButton component="li" id={DocCfgID} >
                <ListItemText primary={Name} />
              </ListItemButton>
            )
        }



<ResizePanel  direction="e" style={{ width: '400px',  maxWidth: "80%" , paddingTop:"2%",}}>
   </ResizePanel>

<Grid xs={2} item style={{backgroundColor:"red"}}>
            
        </Grid>

*/