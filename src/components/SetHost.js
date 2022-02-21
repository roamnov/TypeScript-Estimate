
export default function setHost() {
    let port = document.location.port;
    if (port == "3000")
        port = "1317";
    let o
    if (port !== "")
        o = "http://" + document.location.hostname + ":" + port
    else
        o = "http://" + document.location.hostname
    return o;
}


export const CurrentVersion = " 2.0.1.2"
