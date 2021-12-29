import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import { FooterProps } from '../../ComponentInterface';




export default function StickyFooter( props: FooterProps) {


  const [currentHeight, setCurrentHeight] = useState(window.innerHeight-190);


  const handleResize = () => {
    setCurrentHeight(window.innerHeight-190);
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        
      }}
    >
      <CssBaseline />
     
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
         // mt: `${currentHeight}px`,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container id="footer" maxWidth="xl">
          {props.children}
        </Container>
      </Box>
    </Box>
  );
}


export function RenderFooter( children?: React.ReactNode[] | React.ReactNode){
  ReactDOM.render(
    <>
    SAS
    </>,
    document.getElementById('footer')
  );
}