
const baseURL = 'http://localhost:1317/mobile~project/getconfiglist?LicGUID=ED16868F4BEF468AC4DF0F8CB0E75D4A&All=0&All=0 HTTP/1.1';


const { v4: uuidv4 } = require('uuid');

const GUID = uuidv4()

//let update:boolean = 

export default function URL(request:any, attachment?:any) {   
    return `http://localhost:1317/mobile~project/${request}?LicGUID=94F1A2B59F9762FO9FBB768A6324DFBC&${attachment}`; 
    }
   
export  function ImgURL(attachment?:any) {   
    return <img src={`http://localhost:1317/server~${attachment}`}/>; 
    }