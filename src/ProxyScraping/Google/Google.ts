import cheerio from "cheerio";
import {getLinkCheerio} from "../../Request"
import { getProxiesFromURL } from "../Scraping";

let getLinksFromGoogleSearch = async (search: string,page:number=1) => {
  let links: string[] = [];
  let morePages: string[] = [];

  let $ = await getGoogleSearchCheerio(search,page);

  let aTags = $(".yuRUbf").children("a");

  aTags.map((i, e) => {
    let href = $(e).attr("href");
    if (href != undefined) {
      links.push(href);
    }
  });
  return links;
};
let getGoogleSearchCheerio = async (search: string,page:number = 1):Promise<cheerio.Root> => {
  let reg = new RegExp(/\s/,"g")
  return getLinkCheerio("https://www.google.com/search?q=" + search.replace(reg, "+")+"&start="+(( page-1 )*10).toString());
};

let getProxiesFromGoogleSearch = async (search:string)=>{
  let proxies:string[] = []
  // Array of promises that contain the array of links on every google page
  let googleLinksPromises:Promise<string[]>[] = []
  for (let i = 1; i < 3; i++) {
    googleLinksPromises.push(getLinksFromGoogleSearch(search,i))
  }
  let googlePagesLinks = await Promise.allSettled(googleLinksPromises)
  // Array of promises that contain all proxies on a google search link
  let linkProxiesPromises:Promise<string[]>[] = []
  googlePagesLinks.forEach((googleLinks)=>{
    if (googleLinks.status=="fulfilled"){
      googleLinks.value.forEach((link)=>{
        linkProxiesPromises.push(getProxiesFromURL(link))
      })
    }
  })
  let linkProxies = await Promise.allSettled(linkProxiesPromises)
  linkProxies.forEach((linkProxy)=>{
    if (linkProxy.status == "fulfilled"){
      console.log("INK PROXY")
      console.log(linkProxy.value)
      proxies.concat(linkProxy.value)
    }
  })
  console.log("PROXIES 0")
  console.log(proxies)
  return proxies
}

class Google {}

export { getLinksFromGoogleSearch,getProxiesFromGoogleSearch};
export default Google;
