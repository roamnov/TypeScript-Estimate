import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";



const StillDevelopmentPage=()=>{
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight-189);
    const handleResize = () => {
        setCurrentHeight(window.innerHeight-189);
      }
      useEffect(() => {
        window.addEventListener("resize", handleResize, false);
      }, []);
  
    return (
        <Grid container direction="row"  justifyContent="center"     alignItems="center"  style={{height:`${currentHeight}px`}}>
            <Grid item >
                <Typography variant="h4">
                    Функционал находится в разработке.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default StillDevelopmentPage;