import { getLinksFromGoogleSearch } from "./Google/Google";
import { getProxiesFromLink } from "./Pastebin/Pastebin";
import { checkProxies } from "./Proxies/Proxies";
import { HttpProxyAgent } from "http-proxy-agent";
import fetch from "node-fetch";

// getProxiesFromLink("https://pastebin.com/qFsBiFbt").then((proxies)=>{
//   checkProxies(proxies).then((output)=>{
//     console.log(output)
//   })
// })

// getLinksFromGoogleSearch("site:pastebin.com proxy list").then((a)=>console.log(a))
// getLinksFromGoogleSearch("howtoeatapotato").then((a)=>console.log(a))
// let test = new RegExp(/\s/,"g")
// console.log("waguan my slimes".replace(test,"+"))
interface requestInterface {
  method: string;
  headers: { [key: string]: string };
  agent: HttpProxyAgent;
  redirect: "follow";
}

var requestOptions: requestInterface = {
  method: "GET",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
  },
  agent: new HttpProxyAgent("http://" + "176.9.75.42:8080"),
  redirect: "follow",
};

let url = "http://google.com"
fetch(url, {
  agent: new HttpProxyAgent("http://" + "176.9.75.42:8080"),
  redirect: "follow",
  follow:1000,
})
  .then((response) => {
    console.log("response");
    console.log(response)
    return response.text();
  })
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
