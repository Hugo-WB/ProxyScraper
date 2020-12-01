import {
  getLinksFromGoogleSearch,
  getProxiesFromGoogleSearch,
} from "./ProxyScraping/Google/Google";
import { getProxiesFromPastebinLink } from "./ProxyScraping/Pastebin/Pastebin";
import {
  checkProxies,
  checkProxiesInFile,
  checkProxy,
} from "./ProxyChecking/ProxyChecking";
import { FreeProxyCz } from "./ProxyScraping/FreeProxies/FreeProxyCz";
import { getRandomProxyFromTxt, writeProxiesToTxt } from "./Files";
import {getLinkCheerio, getLinkRaw} from "./Request"
import { getProxiesFromURL } from "./ProxyScraping/Scraping";
import fetch,{Response} from "node-fetch"
import randomUseragent from "random-useragent";


const main = async () => {
  // getLinkRaw("https://www.proxyscan.io/download?type=http").then(re=>console.log(re))
  // let freeProxies = await FreeProxyCz()
  // freeProxies.concat(await getProxiesFromURL("https://www.proxyscan.io/download?type=http"))

  // let validProxies = await checkProxies(freeProxies)
  // await writeProxiesToTxt(validProxies,"validProxies.txt")
  getProxiesFromGoogleSearch("site:pastebin.com proxy list").then((proxies) => {
    console.log("PROXIES"+proxies.length.toString())
    console.log(proxies);
  });
  // getLinkCheerio("https://duckduckgo.com").then(cheerio=>{console.log(cheerio.html())})


  // console.log(await checkProxy("https://duckduckgo.com/","691.31.43431.341:1",3000,true).then((response)=>{
  //   if (response instanceof Response){
  //     response.text().then(text=>console.log(text))
  //   }
  // }))

};


main();
