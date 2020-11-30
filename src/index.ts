import { getLinksFromGoogleSearch } from "./Google/Google";
import { getProxiesFromLink } from "./ProxyScraping/Pastebin/Pastebin";
import {
  checkProxies,
  checkProxiesInFile,
} from "./ProxyChecking/ProxyChecking";


// getProxiesFromLink("https://pastebin.com/qFsBiFbt").then((proxies)=>{
//   checkProxies(proxies).then((output)=>{
//     console.log(output)
//   })
// })
checkProxiesInFile("proxies.txt")
// getLinksFromGoogleSearch("site:pastebin.com proxy list").then((a)=>console.log(a))
// getLinksFromGoogleSearch("howtoeatapotato").then((a)=>console.log(a))
// let test = new RegExp(/\s/,"g")
// console.log("waguan my slimes".replace(test,"+"))
