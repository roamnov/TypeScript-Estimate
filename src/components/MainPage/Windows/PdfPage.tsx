import { useEffect, useState } from "react";

const PdfPage = (props: any) => {
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 189);
    
    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 189);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        
    }, []);
  
    return (
      <div>
      {props.RCDATA !== undefined ?<iframe src={'data:application/pdf;base64,'+props.RCDATA} width="100%" height={currentHeight+28}/>: ''}
  </div>
    )
  }

  export default PdfPage;