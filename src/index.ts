import {
  getLinksFromGoogleSearch,
  getProxiesFromGoogleSearch,
} from "./ProxyScraping/Google/Google";
import { getProxiesFromPastebinLink } from "./ProxyScraping/Pastebin/Pastebin";
import {
  checkProxies,
  checkProxiesInFile,
} from "./ProxyChecking/ProxyChecking";
import { FreeProxyCz } from "./ProxyScraping/FreeProxies/FreeProxyCz";
import { writeProxiesToTxt } from "./Files";
import {getLinkCheerio, getLinkRaw} from "./Request"
import { getProxiesFromURL } from "./ProxyScraping/Scraping";
import fetch from "node-fetch"
import randomUseragent from "random-useragent";


const main = async () => {
  // getLinkRaw("https://www.proxyscan.io/download?type=http").then(re=>console.log(re))
  let freeProxies = await FreeProxyCz()
  // let freeProxies = await getProxiesFromURL("https://www.proxyscan.io/download?type=http")
  let validProxies = await checkProxies(freeProxies)
  await writeProxiesToTxt(validProxies,"validProxies.txt")
  // getProxiesFromGoogleSearch("site:pastebin.com proxy list").then((proxies) => {
  //   console.log("PROXIES"+proxies.length.toString())
  //   console.log(proxies);
  // });
  // getLinkCheerio("https://duckduckgo.com").then(cheerio=>{console.log(cheerio.html())})

};


main();
