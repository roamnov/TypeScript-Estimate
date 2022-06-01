import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import React,{ useEffect, useState } from "react";
import SectionToolsJS from '../../Tools/SectionToolsJS';
import { ImgURL, XMLrequest, } from '../../../Url';
import { Tabs, TabItem} from 'smart-webcomponents-react/tabs';

const MultiPageSection = (props) => {
   const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
   const [data, setData] = React.useState();
  
  useEffect(() => {
        let params = new Map, json;
        params.set('prefix', 'pages');
        params.set("comand", "GetMembers");
        params.set("SectionID", props.id);
        setData(XMLrequest(params));
  },[]);

    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 189);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);
 
    return (
        <><SectionToolsJS  ID={props.id} />
                <Tabs   style={{ position:"absolute", height: "85%", width:"80%", backgroundColor:"s"}}>
                {data && data.Pages.map((Page)=>{
                return(
                    <TabItem label={Page.Name}  >
                      <Typography variant="h4">
                        Функционал находится в разработке.
                      </Typography>
                    </TabItem>
                  )
                 }
                )}
               </Tabs>
          </>
    )
}

export default MultiPageSection;