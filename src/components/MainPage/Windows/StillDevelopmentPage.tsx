import Grid from "@mui/material/Grid"
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
    

    return (
        <><SectionToolsJS  ID={props.id} />
        <Grid container direction="row" justifyContent="center" alignItems="center" style={{ height: `${currentHeight}px` }}>
            <Grid item>
                <div>
                    <Typography variant="h4">
                        Функционал находится в разработке.
                    </Typography>
                </div>
            </Grid>
        </Grid></>
    )
}

export default StillDevelopmentPage;