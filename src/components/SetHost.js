
export default function setHost()
{ let port = document.location.port;
    if (port == "3000")
    port = "8082"
    let o = "http://"+document.location.hostname + ":"+ port
    return  o;
}