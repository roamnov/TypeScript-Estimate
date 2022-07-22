import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react";
import SectionToolsJS from '../Tools/SectionToolsJS';


const StillDevelopmentPage = (props: any) => {
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    
    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 189);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        
    }, []);

    useEffect(()=>{
        console.log(props)
      },[props])
     
    
    function ShowjsonEmptyCLSID(){
        let renurnArr =[]
        if(props.CLSID === undefined){
            let valueany:any
            console.log(props.jsonEmptyCLSID)
            for(const[key,value] of Object.entries(props.jsonEmptyCLSID)){
                valueany = value;
                renurnArr.push(
                    <Link underline="hover">
                        {valueany.Name}
                    </Link>
                )
                console.log(value)
            }
        }else{
            renurnArr.push(
                <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: `${currentHeight}px` }}>
                    <Grid item>
                        <div>
                            <Typography variant="h4">
                                Функционал находится в разработке.
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            )
        }
        return renurnArr
        
    }

    return (
        <>
        {props.SectionToolsJS ? <SectionToolsJS ID={props.id} />: <></>}
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
           {ShowjsonEmptyCLSID()} 
        </Grid>
        
        </>
    )
}

export default StillDevelopmentPage;