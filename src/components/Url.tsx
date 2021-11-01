


import json from "./host.json";

const { v4: uuidv4 } = require('uuid');

const GUID = uuidv4()

//let update:boolean = 

function CreateCokies(name: string, value: string) {
    document.cookie = name + "=" + value;
};
function get_cookie(cookie_name: string): string {
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
export default function URL(params: any) {

    var LicGUID: string;
    LicGUID = get_cookie('LicGUID');
    if (LicGUID == '') {
        var s = "0123456789ABCDEFGHIKLMNOPQRSTVXYZ";
        for (var n = 0; n <= 31; n++) {
            if (n === 0) {
                LicGUID = s[getRandomArbitrary(1, 31)];
            } else {
                LicGUID = LicGUID + s[getRandomArbitrary(1, 31)];
            }
        }
        CreateCokies('LicGUID', LicGUID)
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
    return `${json.serverLocal}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment: ""}`;
}

export function ImgURL(attachment?: any) {
    return <img src={`${json.serverLocal}/server~${attachment}`} />;
}