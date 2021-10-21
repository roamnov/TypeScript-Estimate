


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
function getRandomArbitrary(min: number, max: number ) {
    var res = Math.floor(Math.random() * (max - min) + min);
    return res;
}
export default function URL(request: any, attachment?: any) {
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
    return `${json.server}/mobile~project/${request}?LicGUID=${LicGUID}&${attachment}`;
}

export function ImgURL(attachment?: any) {
    return <img src={`${json.server}/server~${attachment}`} />;
}