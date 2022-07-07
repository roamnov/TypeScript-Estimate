import { useEffect, useState } from "react";
//-55
const PdfPage = (props: any) => {
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 161);
    
    const handleResize = () => {
        setCurrentHeight(window.innerHeight - 161);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);
        
    }, []);
  
    return (
      <div>
      {props.RCDATA !== undefined ?<iframe title="PdfPage" src={'data:application/pdf;base64,'+props.RCDATA} 
            width="100%" height={currentHeight-(props.offsetHeight!==undefined?props.offsetHeight:0)}/>: ''} 
     </div>
    )
  }

  export default PdfPage;