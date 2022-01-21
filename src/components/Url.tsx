import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import json from "./host.json";

const { v4: uuidv4 } = require('uuid');

const GUID = uuidv4()

//let update:boolean = 




function CreateCokies(name: string, value: string) {
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


export function XMLrequest(params: any,postData?:any) {

    var LicGUID: string, request = new XMLHttpRequest(), res ="", method;
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
      
    let url = `${json.serverLocal}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment: ""}`;

    postData === undefined? method = "GET": method = "POST"
    request.open(method, url, false);
        request.onload = function() {
            res = request.responseText;
        };
        if (postData) {
            let json = JSON.stringify(postData);
            request.send(json);
        } else request.send(); 
        
        //console.log(res)
        return JSON.parse(res)
}


export default function URL(params: any, postData?: any) {

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

export async  function  AxiosRequest(params: any,postData?: object| AxiosRequestConfig){
    
    var LicGUID: string,res,method;
   // let res = Object;
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
        if ((pair[0] !== "prefix") && (pair[0] !== "comand") )
            if (!attachment)
                attachment = pair[0] + '=' + pair[1]
            else
                attachment = attachment + "&" + pair[0] + '=' + pair[1];
        //   console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
    }
    if (attachment) 
    attachment = "&" + attachment;
    let comand = params.get("comand");
    let url = `${json.serverLocal}/mobile~${params.get("prefix") == undefined ? 'project' : params.get("prefix")}/${comand}?LicGUID=${LicGUID}${attachment ? attachment: ""}`;
    postData === undefined? method = "get": method = "post"
    if (method==="get" ){
        await axios.get(url).then((response)=>{res = response.data})
    }else if (method==="post" ){
        await axios.post(url, JSON.stringify(postData)).then((response)=>{res = response.data})
    }
    //console.log(res)
    return res
}

export  function  ImgURL(attachment?: any, path?: string) {
    return  <img key={path} src={`${json.serverLocal}/server~${attachment}`} />;
}

export  function  ImgBASE64(attachment?: any, path?: string) {
    return  <img key={path} src={`data:image/png;base64,${attachment}`} />;
}