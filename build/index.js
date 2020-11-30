"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
// getProxiesFromLink("https://pastebin.com/qFsBiFbt").then((proxies)=>{
//   checkProxies(proxies).then((output)=>{
//     console.log(output)
//   })
// })
// getLinksFromGoogleSearch("site:pastebin.com proxy list").then((a)=>console.log(a))
// getLinksFromGoogleSearch("howtoeatapotato").then((a)=>console.log(a))
// let test = new RegExp(/\s/,"g")
// console.log("waguan my slimes".replace(test,"+"))
var config = {
    method: "get",
    url: "https://pastebin.com/raw/d3C8wzJr",
    timeout: 10000,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
    },
    proxy: {
        host: "176.9.75.42",
        port: 8080,
    },
};
axios_1.default(config).then(function (e) { return console.log(e.data); }).catch(function (e) { return console.log(e); });
