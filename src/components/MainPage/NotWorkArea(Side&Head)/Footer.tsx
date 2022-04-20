import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect,useState } from 'react';




export default function StickyFooter() {


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
        <Container id="footerProgress" maxWidth="xl">

        </Container>
      </Box>
    </Box>
  );
}

