
export default function setHost() {
    let port = document.location.port;
    if (port == "3000")
        port = "8082";
    let o
    if (port !== "")
        o = "http://" + document.location.hostname + ":" + port
    else
        o = "http://" + document.location.hostname
    return o;
}