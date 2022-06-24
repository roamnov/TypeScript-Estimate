import { Button } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import ReactDOM from "react-dom";
import ModalContainer from "./Containers/ModalContainer";
import setHost from "./SetHost.js"


//let update:boolean = 

//document.location.origin


export function CreateCokies(name: string, value: string) {
        document.cookie = name + "=" + value;
};
export function get_cookie(cookie_name: string): string {
    var results = document.cookie.match(
        "(^|;) ?" + cookie_name + "=([^;]*)(;|$)"
    );

    if (results) return unescape(results[2]);
    else return '';
};
function getRandomArbitrary(min: number, max: number) {
    var res = Math.floor(Math.random() * (max - min) + min);
    return res;
}


export function XMLrequest(params: any, postData?: any) {

    var LicGUID: string, request = new XMLHttpRequest(), res = "", method;
    LicGUID = get_cookie('LicG');
    if (LicGUID == "") {
        var s = "0123456789ABCDEFGHIKLMNOPQRSTVXYZ";
        for (var n = 0; n <= 31; n++) {
            if (n === 0) {
                LicGUID = s[getRandomArbitrary(1, 31)];
            } else {
                LicGUID = LicGUID + s[getRandomArbitrary(1, 31)];
            }
        }
       // licG = LicGUID
        CreateCokies('LicG', LicGUID)
    }
    var attachment = "";
    for (let pair of params) {
        if ((pair[0] !== "prefix") && (pair[0] !== "comand"))
            if (!attachment)
                attachment = pair[0] + '=' + pair[1]
            else
                attachment = attachment + "&" + pair[0] + '=' + pair[1];
        //   console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
    }
    if (attachment)
        attachment = "&" + attachment;
    let comand = params.get("comand");
    let origin = setHost();
    // let origin = json.currentURL ? document.location.origin : json.serverLocal;
    let url = `${origin}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment : ""}`;

    postData === undefined ? method = "GET" : method = "POST"
    request.open(method, url, false);
    request.onload = function () {
        res = request.responseText;
    };
    if (postData) {
        let json = JSON.stringify(postData);
        request.send(json);
    } else request.send();

    //console.log(res)
    try {
        const parsedJSON = JSON.parse(res)
        
        if(parsedJSON.error){
            const Message = `Ошибка выполнения операции на сервере: ${parsedJSON.error.content}`
            console.log(parsedJSON.error)
            ReactDOM.render(<ModalContainer dlgType={"Ошибка"} content={Message} />, document.getElementById('footerProgress'));
        }
        return parsedJSON
    } catch (err) {
        console.log(err)
    }

}
export default function URL(params: any, postData?: any) {

    var LicGUID: string;
    LicGUID = get_cookie('LicG');
    if (LicGUID == "") {
        var s = "0123456789ABCDEFGHIKLMNOPQRSTVXYZ";
        for (var n = 0; n <= 31; n++) {
            if (n === 0) {
                LicGUID = s[getRandomArbitrary(1, 31)];
            } else {
                LicGUID = LicGUID + s[getRandomArbitrary(1, 31)];
            }
        }
       // licG = LicGUID
        CreateCokies('LicG', LicGUID)
    }
    var attachment = "";

    for (let pair of params) {
        if ((pair[0] !== "prefix") && (pair[0] !== "comand"))
            if (!attachment)
                attachment = pair[0] + '=' + pair[1]
            else
                attachment = attachment + "&" + pair[0] + '=' + pair[1];
        //   console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
    }
    if (attachment)
        attachment = "&" + attachment;
    let comand = params.get("comand");
    let origin = setHost();

    return `${origin}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment : ""}`;
}

export async function AxiosRequest(params: any, postData?: object | AxiosRequestConfig) {

    var LicGUID: string, res, method;
    // let res = Object;
    LicGUID = get_cookie('LicG');
   // LicGUID = licG; //get_cookie('LicGUID');
    if (LicGUID == "") {
        var s = "0123456789ABCDEFGHIKLMNOPQRSTVXYZ";
        for (var n = 0; n <= 31; n++) {
            if (n === 0) {
                LicGUID = s[getRandomArbitrary(1, 31)];
            } else {
                LicGUID = LicGUID + s[getRandomArbitrary(1, 31)];
            }
        }
       // licG = LicGUID
        CreateCokies('LicG', LicGUID)
    }
    var attachment = "";
    for (let pair of params) {
        if ((pair[0] !== "prefix") && (pair[0] !== "comand"))
            if (!attachment)
                attachment = pair[0] + '=' + pair[1]
            else
                attachment = attachment + "&" + pair[0] + '=' + pair[1];
        //   console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
    }
    if (attachment)
        attachment = "&" + attachment;
    let comand = params.get("comand");
    let url = `${setHost()}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment : ""}`;
    postData === undefined ? method = "get" : method = "post"
    if (method === "get") {
        await axios.get(url).then((response) => { res = response.data })
    } else if (method === "post") {
        await axios.post(url, JSON.stringify(postData)).then((response) => { res = response.data })
    }
    //console.log(res)
    return res
}

export function ImgURL(attachment?: any, h?: string, w?: string, path?: string) {
    let origin = setHost();
    return <img key={path} style={{ height: h, width: w }} src={`${origin}/server~${attachment}`} />;
}

export function ImgBASE64(attachment?: any, path?: string) {
    return <img key={path} src={`data:image/png;base64,${attachment}`} />;
}