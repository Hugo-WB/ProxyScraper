import { getLinksFromGoogleSearch } from "./ProxyScraping/Google/Google";
import { getProxiesFromLink } from "./ProxyScraping/Pastebin/Pastebin";
import {
  checkProxies,
  checkProxiesInFile,
} from "./ProxyChecking/ProxyChecking";
import { FreeProxyCz } from "./ProxyScraping/FreeProxies/FreeProxyCz"
import {writeProxiesToTxt} from "./Files"
import { getProxiesFromURL } from "./ProxyScraping/Scraping";


// checkProxiesInFile("proxies.txt")

const main = async () =>{
  // let freeProxies = await FreeProxyCz()
  let freeProxies = await getProxiesFromURL("https://www.proxyscan.io/download?type=http")
  let validProxies = await checkProxies(freeProxies)
  await writeProxiesToTxt(validProxies,"validProxies.txt")



}


// getProxiesFromLink("https://pastebin.com/qFsBiFbt").then((proxies)=>{
//   checkProxies(proxies).then((output)=>{
//     console.log(output)
//   })
// })


// getLinksFromGoogleSearch("site:pastebin.com proxy list").then((a)=>console.log(a))
// getLinksFromGoogleSearch("howtoeatapotato").then((a)=>console.log(a))
// let test = new RegExp(/\s/,"g")
// console.log("waguan my slimes".replace(test,"+"))

main()